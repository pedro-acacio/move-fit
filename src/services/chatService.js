import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { auth, banco } from "./firebase";

// Chat entre aluno e professor (RF20).
// Cada mensagem é um documento na coleção "mensagens". A conversa é o par aluno + professor.

function colecaoMensagens() {
  return collection(banco, "mensagens");
}

// Logo depois de enviar, a hora do servidor ainda não chegou (fica null por um instante).
// Nesse caso usamos "agora", para a mensagem nova aparecer no fim da conversa.
function horaDe(mensagem) {
  return mensagem.enviadaEm?.toMillis() ?? Date.now();
}

// Ouve as mensagens da conversa em tempo real, da mais antiga para a mais nova.
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