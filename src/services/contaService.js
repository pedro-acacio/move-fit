import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, where, writeBatch } from "firebase/firestore";
import { auth, banco } from "./firebase";

// Exclusão da conta (direito de exclusão da LGPD, art. 18).
// Apaga do Firestore tudo o que pertence ao usuário e depois a conta no Firebase Authentication.

// O que é apagado em cada coleção, conforme o tipo de conta.
// O campo diz de quem é o documento (ex.: "alunoId" igual ao uid de quem está saindo).
const DADOS_DA_CONTA = {
  aluno: [
    { colecao: "historico", campo: "alunoId" },
    { colecao: "vinculos", campo: "alunoId" },
    { colecao: "mensagens", campo: "alunoId" },
  ],
  professor: [
    { colecao: "treinos", campo: "professorId" },
    { colecao: "exercicios", campo: "professorId" },
    { colecao: "vinculos", campo: "professorId" },
    { colecao: "mensagens", campo: "professorId" },
  ],
};

// O Firestore aceita no máximo 500 operações em um lote (writeBatch).
const LIMITE_DO_LOTE = 500;

async function documentosOnde(colecao, campo, uid) {
  const resultado = await getDocs(query(collection(banco, colecao), where(campo, "==", uid)));
  return resultado.docs;
}

export async function excluirConta(senha) {
  const conta = auth.currentUser;

  // 1. Confirma a senha. O Firebase só deixa apagar a conta de quem fez login há pouco tempo,
  //    e isso também garante que é o próprio dono que está apagando.
  await reauthenticateWithCredential(conta, EmailAuthProvider.credential(conta.email, senha));

  const uid = conta.uid;
  const perfil = (await getDoc(doc(banco, "usuarios", uid))).data()?.perfil ?? "aluno";

  // 2. Junta tudo o que será mudado em uma lista de operações.
  const operacoes = [];

  for (const { colecao, campo } of DADOS_DA_CONTA[perfil]) {
    for (const documento of await documentosOnde(colecao, campo, uid)) {
      operacoes.push((lote) => lote.delete(documento.ref));
    }
  }

  // Os treinos que o aluno recebeu são do professor: ficam com ele, só sem o nome do aluno.
  if (perfil === "aluno") {
    for (const documento of await documentosOnde("treinos", "alunoId", uid)) {
      operacoes.push((lote) => lote.update(documento.ref, { alunoId: null, alunoNome: null }));
    }
  }

  // Por último, o perfil (nome, e-mail, código, foto, CREF e datas).
  operacoes.push((lote) => lote.delete(doc(banco, "usuarios", uid)));

  // 3. Grava em lotes. Dentro de um lote é "tudo ou nada": se o Firebase recusar
  //    uma operação, nenhuma daquele lote acontece.
  for (let inicio = 0; inicio < operacoes.length; inicio += LIMITE_DO_LOTE) {
    const lote = writeBatch(banco);
    operacoes.slice(inicio, inicio + LIMITE_DO_LOTE).forEach((operacao) => operacao(lote));
    await lote.commit();
  }

  // 4. Apaga a conta de login. Depois disso o app volta sozinho para o Login.
  await deleteUser(conta);
}
