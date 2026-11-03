import { View } from "react-native";
import styles from "./BarraProgresso.styles";

// Barra que enche de acordo com "atual" de "total" (ex.: 2 de 4 = metade).
export function BarraProgresso({ atual, total }) {
  const porcentagem = total > 0 ? Math.min(atual / total, 1) * 100 : 0;

  return (
    <View style={styles.trilho}>
      <View style={[styles.preenchimento, { width: `${porcentagem}%` }]} />
    </View>
  );
}
