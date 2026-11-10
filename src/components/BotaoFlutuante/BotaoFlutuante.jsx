import { Pressable, Text } from "react-native";
import { useCorDaArea } from "../../context/CorDaArea";
import styles from "./BotaoFlutuante.styles";

// Botão arredondado que fica parado no canto inferior direito da tela,
// por cima do conteúdo (ex.: "Assistente IA", "+ Novo treino").
export function BotaoFlutuante({ texto, onPress }) {
  const cor = useCorDaArea();

  return (
    <Pressable style={[styles.botao, { backgroundColor: cor }]} onPress={onPress}>
      <Text style={styles.texto}>{texto}</Text>
    </Pressable>
  );
}
