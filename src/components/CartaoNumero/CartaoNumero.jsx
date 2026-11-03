import { Text, View } from "react-native";
import styles from "./CartaoNumero.styles";

// Cartão pequeno com um número grande e uma legenda (ex.: "12" / "Ativos").
// Feito para ficar lado a lado com outros, por isso usa flex: 1.
export function CartaoNumero({ valor, rotulo }) {
  return (
    <View style={styles.cartao}>
      <Text style={styles.valor}>{valor}</Text>
      <Text style={styles.rotulo}>{rotulo}</Text>
    </View>
  );
}
