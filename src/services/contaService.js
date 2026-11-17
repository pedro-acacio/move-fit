import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, where, writeBatch } from "firebase/firestore";
import { auth, banco } from "./firebase";






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


const LIMITE_DO_LOTE = 500;

async function documentosOnde(colecao, campo, uid) {
  const resultado = await getDocs(query(collection(banco, colecao), where(campo, "==", uid)));
  return resultado.docs;
}

export async function excluirConta(senha) {
  const conta = auth.currentUser;



  await reauthenticateWithCredential(conta, EmailAuthProvider.credential(conta.email, senha));

  const uid = conta.uid;
  const perfil = (await getDoc(doc(banco, "usuarios", uid))).data()?.perfil ?? "aluno";


  const operacoes = [];

  for (const { colecao, campo } of DADOS_DA_CONTA[perfil]) {
    for (const documento of await documentosOnde(colecao, campo, uid)) {
      operacoes.push((lote) => lote.delete(documento.ref));
    }
  }


  if (perfil === "aluno") {
    for (const documento of await documentosOnde("treinos", "alunoId", uid)) {
      operacoes.push((lote) => lote.update(documento.ref, { alunoId: null, alunoNome: null }));
    }
  }


  operacoes.push((lote) => lote.delete(doc(banco, "usuarios", uid)));



  for (let inicio = 0; inicio < operacoes.length; inicio += LIMITE_DO_LOTE) {
    const lote = writeBatch(banco);
    operacoes.slice(inicio, inicio + LIMITE_DO_LOTE).forEach((operacao) => operacao(lote));
    await lote.commit();
  }


  await deleteUser(conta);
}
