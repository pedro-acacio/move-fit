import { Text, View } from "react-native";
import { useCorDaArea } from "../../context/CorDaArea";
import styles from "./BalaoMensagem.styles";

// Balão de uma mensagem do chat.
// autor "usuario" fica à direita (escuro); autor "ia" fica à esquerda (claro).
export function BalaoMensagem({ autor, texto }) {
  const doUsuario = autor === "usuario";
  const cor = useCorDaArea();

  return (
    <View style={[styles.balao, doUsuario ? [styles.balaoUsuario, { backgroundColor: cor }] : styles.balaoIa]}>
      <Text style={doUsuario ? styles.textoUsuario : styles.textoIa}>{texto}</Text>
    </View>
  );
}
