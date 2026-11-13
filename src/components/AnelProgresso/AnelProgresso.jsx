import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useCorDaArea } from "../../context/CorDaArea";
import { colors } from "../../styles/theme";
import styles from "./AnelProgresso.styles";

const TAMANHO = 140;
const ESPESSURA = 14;
const RAIO = (TAMANHO - ESPESSURA) / 2;
const CIRCUNFERENCIA = 2 * Math.PI * RAIO;

// Anel de progresso: ex. quantos alunos já fizeram o treino hoje, de quantos estão vinculados.
export function AnelProgresso({ concluidos, total, rotulo }) {
  const cor = useCorDaArea();
  const porcentagem = total > 0 ? concluidos / total : 0;
  const preenchido = CIRCUNFERENCIA * porcentagem;

  return (
    <View style={styles.container}>
      <View style={styles.anel}>
        {/* O Svg inteiro gira -90° para o anel começar no topo (igual a um relógio). */}
        <Svg width={TAMANHO} height={TAMANHO} style={styles.giro}>
          <Circle
            cx={TAMANHO / 2}
            cy={TAMANHO / 2}
            r={RAIO}
            stroke={colors.borda}
            strokeWidth={ESPESSURA}
            fill="none"
          />
          <Circle
            cx={TAMANHO / 2}
            cy={TAMANHO / 2}
            r={RAIO}
            stroke={cor}
            strokeWidth={ESPESSURA}
            strokeDasharray={`${preenchido}, ${CIRCUNFERENCIA}`}
            strokeLinecap="round"
            fill="none"
          />
        </Svg>

        <View style={styles.centro}>
          <Text style={styles.numero}>{`${concluidos}/${total}`}</Text>
        </View>
      </View>

      {rotulo && <Text style={styles.rotulo}>{rotulo}</Text>}
    </View>
  );
}
