import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { auth, banco } from "./firebase";




function colecaoMensagens() {
  return collection(banco, "mensagens");
}



function horaDe(mensagem) {
  return mensagem.enviadaEm?.toMillis() ?? Date.now();
}


export function observarConversa(alunoId, professorId, aoMudar) {
  const consulta = query(
    colecaoMensagens(),
    where("alunoId", "==", alunoId),
    where("professorId", "==", professorId)
  );

  return onSnapshot(consulta, (resultado) => {
    const lista = resultado.docs.map((documento) => ({ id: documento.id, ...documento.data() }));
    aoMudar(lista.sort((a, b) => horaDe(a) - horaDe(b)));
  });
}

export function enviarMensagem(alunoId, professorId, texto) {
  return addDoc(colecaoMensagens(), {
    alunoId,
    professorId,
    autorId: auth.currentUser.uid,
    texto,
    enviadaEm: serverTimestamp(),
  });
}