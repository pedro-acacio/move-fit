import { Pressable, Text, View } from "react-native";
import styles from "./SeletorNumero.styles";

export function SeletorNumero({ rotulo, valor, aoMudar, minimo = 0, maximo = 99 }) {
  function diminuir() {
    aoMudar(Math.max(minimo, valor - 1));
  }

  function aumentar() {
    aoMudar(Math.min(maximo, valor + 1));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <View style={styles.caixa}>
        <Pressable style={styles.botao} onPress={diminuir} hitSlop={8}>
          <Text style={styles.seta}>▼</Text>
        </Pressable>

        <Text style={styles.valor}>{valor}</Text>

        <Pressable style={styles.botao} onPress={aumentar} hitSlop={8}>
          <Text style={styles.seta}>▲</Text>
        </Pressable>
      </View>
    </View>
  );
}
