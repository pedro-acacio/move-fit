import { Text, View } from "react-native";
import styles from "./LinhaTreino.styles";


export function LinhaTreino({ nome, info, ultima }) {
  return (
    <View style={[styles.linha, !ultima && styles.divisor]}>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
}