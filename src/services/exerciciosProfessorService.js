import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, banco } from "./firebase";

function colecaoExercicios() {
  return collection(banco, "exercicios");
}

function porDataDeCriacao(a, b) {
  const tempoA = a.criadoEm?.toMillis() ?? Date.now();
  const tempoB = b.criadoEm?.toMillis() ?? Date.now();
  return tempoB - tempoA;
}

export function observarExerciciosDoProfessor(aoMudar) {
  const consulta = query(colecaoExercicios(), where("professorId", "==", auth.currentUser.uid));

  return onSnapshot(consulta, (resultado) => {
    const exercicios = resultado.docs.map((documento) => ({ id: documento.id, ...documento.data() }));
    aoMudar(exercicios.sort(porDataDeCriacao));
  });
}

export function criarExercicio({ nome, grupo, descricao }) {
  return addDoc(colecaoExercicios(), {
    nome,
    grupo,
    descricao,
    professorId: auth.currentUser.uid,
    criadoEm: serverTimestamp(),
  });
}

export function atualizarExercicio(id, { nome, grupo, descricao }) {
  return updateDoc(doc(banco, "exercicios", id), { nome, grupo, descricao });
}

export function excluirExercicio(id) {
  return deleteDoc(doc(banco, "exercicios", id));
}
