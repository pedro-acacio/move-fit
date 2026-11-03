import { Text, View } from "react-native";
import { BarraProgresso } from "../BarraProgresso/BarraProgresso";
import styles from "./CartaoMeta.styles";

// Cartão de progresso: título, contagem à direita, barra e uma frase abaixo.
// Por padrão a contagem é "2 de 4 treinos" (meta semanal, Histórico, Detalhes do aluno).
// Use "contagem" para trocar esse texto, ex.: "75%" no engajamento do professor.
export function CartaoMeta({ titulo, concluidos, meta, frase, contagem }) {
  return (
    <View style={styles.cartao}>
      <View style={styles.linha}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.contagem}>{contagem ?? `${concluidos} de ${meta} treinos`}</Text>
      </View>

      <BarraProgresso atual={concluidos} total={meta} />

      {frase && <Text style={styles.frase}>{frase}</Text>}
    </View>
  );
}
