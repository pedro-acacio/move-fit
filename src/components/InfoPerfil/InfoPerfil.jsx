import { Text, View } from "react-native";
import styles from "./InfoPerfil.styles";

// Informação só para leitura: rótulo em cima e valor dentro de uma caixa.
export function InfoPerfil({ rotulo, valor }) {
  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <View style={styles.caixa}>
        <Text style={styles.valor}>{valor}</Text>
      </View>
    </View>
  );
}
