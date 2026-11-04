import { Text, View } from "react-native";
import styles from "./CartaoHistorico.styles";

// Cartão de um treino já concluído: nome em cima e, embaixo, o dia e a quantidade de exercícios.
export function CartaoHistorico({ titulo, detalhe }) {
  return (
    <View style={styles.cartao}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.detalhe}>{detalhe}</Text>
    </View>
  );
}