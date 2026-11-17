import { Text, View } from "react-native";
import styles from "./Dica.styles";


export function Dica({ texto }) {
  return (
    <View style={styles.caixa}>
      <Text style={styles.texto}>{texto}</Text>
    </View>
  );
}
