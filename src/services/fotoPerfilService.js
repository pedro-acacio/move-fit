import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, banco } from "./firebase";

// Foto de perfil do aluno e do professor.
// A foto é diminuída para 256 px e salva como texto (base64) no próprio documento do usuário,
// no campo "foto". Assim não precisa do Firebase Storage, que exige o plano pago.
const LADO = 256;

// Abre a galeria, diminui a foto escolhida e salva no perfil.
// Devolve false se a pessoa fechar a galeria sem escolher nada.
export async function escolherFotoDePerfil() {
  const resultado = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "images",
    allowsEditing: true, // no celular, deixa recortar
    aspect: [1, 1], // recorte quadrado, para caber no círculo
    quality: 1,
  });

  if (resultado.canceled) return false;

  const imagem = resultado.assets[0];

  // O lado menor fica com 256 px. O círculo corta o que sobrar.
  const contexto = ImageManipulator.manipulate(imagem.uri);
  contexto.resize(imagem.width > imagem.height ? { height: LADO } : { width: LADO });
  const renderizada = await contexto.renderAsync();
  const pronta = await renderizada.saveAsync({ format: SaveFormat.JPEG, compress: 0.7, base64: true });

  await updateDoc(doc(banco, "usuarios", auth.currentUser.uid), {
    foto: `data:image/jpeg;base64,${pronta.base64}`,
  });
  return true;
}

// Acompanha a foto de outra pessoa (ex.: o professor na lista do aluno, ou o contato no chat).
// Avisa de novo sempre que ela trocar a foto. Devolve uma função que desliga o vigia.
export function observarFotoDoUsuario(usuarioId, aoMudar) {
  return onSnapshot(doc(banco, "usuarios", usuarioId), (documento) => {
    aoMudar(documento.data()?.foto ?? null);
  });
}
