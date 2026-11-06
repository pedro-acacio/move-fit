import { Pressable, Text } from "react-native";
import styles from "./Botao.styles";

export function Botao({ texto, onPress, secundario }) {
  return (
    <Pressable style={[styles.botao, secundario && styles.botaoSecundario]} onPress={onPress}>
      <Text style={[styles.texto, secundario && styles.textoSecundario]}>{texto}</Text>
    </Pressable>
  );
}