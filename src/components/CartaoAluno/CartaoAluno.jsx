import { Pressable, Text, View } from "react-native";
import { SeloStatus } from "../SeloStatus/SeloStatus";
import styles from "./CartaoAluno.styles";

// Cartão clicável de um aluno: nome, uma linha de detalhe e o selo de status.
// Usado no Dashboard e pode ser usado na aba Alunos.
export function CartaoAluno({ nome, detalhe, status, onPress }) {
  return (
    <Pressable style={styles.cartao} onPress={onPress}>
      <View style={styles.info}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.detalhe}>{detalhe}</Text>
      </View>
      <SeloStatus status={status} />
    </Pressable>
  );
}
