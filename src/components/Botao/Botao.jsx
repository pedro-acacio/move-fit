import { Pressable, Text } from "react-native";
import styles from "./Botao.styles";

export function Botao({ texto, onPress }) {
  return (
    <Pressable style={styles.botao} onPress={onPress}>
      <Text style={styles.texto}>{texto}</Text>
    </Pressable>
  );
}
