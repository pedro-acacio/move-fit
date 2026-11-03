import { Text, View } from "react-native";
import styles from "./BalaoMensagem.styles";

// Balão de uma mensagem do chat.
// autor "usuario" fica à direita (escuro); autor "ia" fica à esquerda (claro).
export function BalaoMensagem({ autor, texto }) {
  const doUsuario = autor === "usuario";

  return (
    <View style={[styles.balao, doUsuario ? styles.balaoUsuario : styles.balaoIa]}>
      <Text style={doUsuario ? styles.textoUsuario : styles.textoIa}>{texto}</Text>
    </View>
  );
}
