import { Pressable, Text, View } from "react-native";
import styles from "./CartaoExercicioFeito.styles";

// Exercício do treino do aluno: o quadrado marca como feito (RF16)
// e o resto do cartão abre os detalhes do exercício.
export function CartaoExercicioFeito({ nome, detalhe, feito, aoMarcar, onPress }) {
  return (
    <View style={styles.cartao}>
      <Pressable
        style={[styles.caixa, feito && styles.caixaFeita]}
        onPress={aoMarcar}
        hitSlop={10}
      >
        {feito && <Text style={styles.marca}>✓</Text>}
      </Pressable>

      <Pressable style={styles.info} onPress={onPress}>
        <View style={styles.textos}>
          <Text style={[styles.nome, feito && styles.nomeFeito]}>{nome}</Text>
          <Text style={styles.detalhe}>{detalhe}</Text>
        </View>
        <Text style={styles.seta}>›</Text>
      </Pressable>
    </View>
  );
}
