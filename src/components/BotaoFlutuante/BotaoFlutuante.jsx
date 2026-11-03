import { Pressable, Text } from "react-native";
import styles from "./BotaoFlutuante.styles";

// Botão arredondado que fica parado no canto inferior direito da tela,
// por cima do conteúdo (ex.: "Assistente IA", "+ Novo treino").
export function BotaoFlutuante({ texto, onPress }) {
  return (
    <Pressable style={styles.botao} onPress={onPress}>
      <Text style={styles.texto}>{texto}</Text>
    </Pressable>
  );
}
