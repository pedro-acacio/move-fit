import { Pressable, Text, View } from "react-native";
import styles from "./CartaoTreino.styles";


export function CartaoTreino({ titulo, detalhe, onPress }) {
  return (
    <Pressable style={styles.cartao} onPress={onPress}>
      <View style={styles.info}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.detalhe}>{detalhe}</Text>
      </View>
      <Text style={styles.seta}>›</Text>
    </Pressable>
  );
}
