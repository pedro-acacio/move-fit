import { Text, View } from "react-native";
import styles from "./CartaoNumero.styles";



export function CartaoNumero({ valor, rotulo }) {
  return (
    <View style={styles.cartao}>
      <Text style={styles.valor}>{valor}</Text>
      <Text style={styles.rotulo}>{rotulo}</Text>
    </View>
  );
}
