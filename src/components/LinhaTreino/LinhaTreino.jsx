import { Text, View } from "react-native";
import styles from "./LinhaTreino.styles";

// Linha de um treino: nome à esquerda e uma informação curta à direita.
export function LinhaTreino({ nome, info, ultima }) {
  return (
    <View style={[styles.linha, !ultima && styles.divisor]}>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
}