import { addDoc, collection, getDocs, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { auth, banco } from "./firebase";





function colecaoVinculos() {
  return collection(banco, "vinculos");
}

export async function vincularPorCodigo(codigo, meuPerfil, meuNome) {
  const meuUid = auth.currentUser.uid;

  const encontrados = await getDocs(query(collection(banco, "usuarios"), where("codigo", "==", codigo)));

  if (encontrados.empty) {
    throw new Error("Nenhum usuário encontrado com esse código.");
  }

  const documento = encontrados.docs[0];
  const outroId = documento.id;
  const outro = documento.data();

  if (outroId === meuUid) {
    throw new Error("Esse é o seu próprio código.");
  }

  if (outro.perfil === meuPerfil) {
    throw new Error(
      meuPerfil === "professor" ? "Esse código não é de um aluno." : "Esse código não é de um professor."
    );
  }

  const alunoId = meuPerfil === "aluno" ? meuUid : outroId;
  const alunoNome = meuPerfil === "aluno" ? meuNome : outro.nome;
  const professorId = meuPerfil === "professor" ? meuUid : outroId;
  const professorNome = meuPerfil === "professor" ? meuNome : outro.nome;

  const existente = await getDocs(
    query(colecaoVinculos(), where("alunoId", "==", alunoId), where("professorId", "==", professorId))
  );

  if (!existente.empty) {
    throw new Error("Vocês já estão vinculados.");
  }

  await addDoc(colecaoVinculos(), {
    alunoId,
    alunoNome,
    professorId,
    professorNome,
    criadoEm: serverTimestamp(),
  });
}

export function observarAlunosDoProfessor(aoMudar) {
  const consulta = query(colecaoVinculos(), where("professorId", "==", auth.currentUser.uid));

  return onSnapshot(consulta, (resultado) => {
    aoMudar(resultado.docs.map((doc) => ({ id: doc.data().alunoId, nome: doc.data().alunoNome })));
  });
}

export function observarProfessoresDoAluno(aoMudar) {
  const consulta = query(colecaoVinculos(), where("alunoId", "==", auth.currentUser.uid));

  return onSnapshot(consulta, (resultado) => {
    aoMudar(resultado.docs.map((doc) => ({ id: doc.data().professorId, nome: doc.data().professorNome })));
  });
}


export function observarProfessoresDaAcademia(aoMudar) {
  const consulta = query(collection(banco, "usuarios"), where("perfil", "==", "professor"));

  return onSnapshot(consulta, (resultado) => {
    aoMudar(resultado.docs.map((doc) => ({ id: doc.id, nome: doc.data().nome, cref: doc.data().cref })));
  });
}

