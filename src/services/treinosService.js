import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, banco } from "./firebase";




function colecaoTreinos() {
  return collection(banco, "treinos");
}

function porDataDeCriacao(a, b) {
  const tempoA = a.criadoEm?.toMillis() ?? Date.now();
  const tempoB = b.criadoEm?.toMillis() ?? Date.now();
  return tempoB - tempoA;
}

function paraLista(resultado) {
  return resultado.docs
    .map((documento) => ({ id: documento.id, ...documento.data() }))
    .sort(porDataDeCriacao);
}

export function observarTreinosDoProfessor(aoMudar) {
  const consulta = query(colecaoTreinos(), where("professorId", "==", auth.currentUser.uid));

  return onSnapshot(consulta, (resultado) => aoMudar(paraLista(resultado)));
}

export function observarTreinosDoAluno(aoMudar) {
  const consulta = query(colecaoTreinos(), where("alunoId", "==", auth.currentUser.uid));

  return onSnapshot(consulta, (resultado) => aoMudar(paraLista(resultado)));
}

export async function buscarTreino(id) {
  const documento = await getDoc(doc(banco, "treinos", id));
  return documento.exists() ? { id: documento.id, ...documento.data() } : null;
}


export async function salvarTreino({ id, nome, alunoId, alunoNome, exercicios, professorNome }) {
  const dados = {
    nome,
    alunoId: alunoId ?? null,
    alunoNome: alunoNome ?? null,
    exercicios,
    professorId: auth.currentUser.uid,
    professorNome,
  };

  if (id) {
    await updateDoc(doc(banco, "treinos", id), dados);
    return id;
  }

  const novo = await addDoc(colecaoTreinos(), { ...dados, criadoEm: serverTimestamp() });
  return novo.id;
}

export function excluirTreino(id) {
  return deleteDoc(doc(banco, "treinos", id));
}


export function duplicarTreino(treino) {
  return addDoc(colecaoTreinos(), {
    nome: `${treino.nome} (cópia)`,
    exercicios: treino.exercicios,
    professorId: treino.professorId,
    professorNome: treino.professorNome,
    alunoId: null,
    alunoNome: null,
    criadoEm: serverTimestamp(),
  });
}
