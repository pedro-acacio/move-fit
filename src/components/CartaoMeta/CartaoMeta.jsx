import { Text, View } from "react-native";
import { BarraProgresso } from "../BarraProgresso/BarraProgresso";
import styles from "./CartaoMeta.styles";

// Cartão da meta semanal: título, "2 de 4 treinos", barra e uma frase abaixo.
// Também serve para o Histórico ("Esta semana") e para os Detalhes do aluno.
export function CartaoMeta({ titulo, concluidos, meta, frase }) {
  return (
    <View style={styles.cartao}>
      <View style={styles.linha}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.contagem}>
          {concluidos} de {meta} treinos
        </Text>
      </View>

      <BarraProgresso atual={concluidos} total={meta} />

      {frase && <Text style={styles.frase}>{frase}</Text>}
    </View>
  );
}
