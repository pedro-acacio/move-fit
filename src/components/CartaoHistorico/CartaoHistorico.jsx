import { Text, View } from "react-native";
import styles from "./CartaoHistorico.styles";


export function CartaoHistorico({ titulo, detalhe }) {
  return (
    <View style={styles.cartao}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.detalhe}>{detalhe}</Text>
    </View>
  );
}