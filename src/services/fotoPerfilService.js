import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, banco } from "./firebase";




const LADO = 256;



export async function escolherFotoDePerfil() {
  const resultado = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "images",
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (resultado.canceled) return false;

  const imagem = resultado.assets[0];


  const contexto = ImageManipulator.manipulate(imagem.uri);
  contexto.resize(imagem.width > imagem.height ? { height: LADO } : { width: LADO });
  const renderizada = await contexto.renderAsync();
  const pronta = await renderizada.saveAsync({ format: SaveFormat.JPEG, compress: 0.7, base64: true });

  await updateDoc(doc(banco, "usuarios", auth.currentUser.uid), {
    foto: `data:image/jpeg;base64,${pronta.base64}`,
  });
  return true;
}



export function observarFotoDoUsuario(usuarioId, aoMudar) {
  return onSnapshot(doc(banco, "usuarios", usuarioId), (documento) => {
    aoMudar(documento.data()?.foto ?? null);
  });
}
