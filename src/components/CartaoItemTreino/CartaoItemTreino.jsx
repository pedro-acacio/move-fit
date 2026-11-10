import { Pressable, Text, View } from "react-native";
import styles from "./CartaoItemTreino.styles";

// Exercício dentro do cadastro de treino: nome, séries/repetições e o botão Remover (vermelho).
export function CartaoItemTreino({ nome, detalhe, aoRemover }) {
  return (
    <View style={styles.cartao}>
      <View style={styles.info}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.detalhe}>{detalhe}</Text>
      </View>
      <Pressable style={styles.remover} onPress={aoRemover} hitSlop={8}>
        <Text style={styles.removerTexto}>Remover</Text>
      </Pressable>
    </View>
  );
}
