import { Text, View } from "react-native";
import { BarraProgresso } from "../BarraProgresso/BarraProgresso";
import styles from "./CartaoMeta.styles";




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
