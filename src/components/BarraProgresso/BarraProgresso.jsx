import { View } from "react-native";
import { useCorDaArea } from "../../context/CorDaArea";
import styles from "./BarraProgresso.styles";


export function BarraProgresso({ atual, total }) {
  const cor = useCorDaArea();
  const porcentagem = total > 0 ? Math.min(atual / total, 1) * 100 : 0;

  return (
    <View style={styles.trilho}>
      <View style={[styles.preenchimento, { width: `${porcentagem}%`, backgroundColor: cor }]} />
    </View>
  );
}
