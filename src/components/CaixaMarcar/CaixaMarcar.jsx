import { Pressable, Text, View } from "react-native";
import { useCorDaArea } from "../../context/CorDaArea";
import styles from "./CaixaMarcar.styles";




export function CaixaMarcar({ marcado, aoMudar, cor, children }) {
  const corDaArea = useCorDaArea();
  const corDaCaixa = cor ?? corDaArea;

  return (
    <Pressable style={styles.linha} onPress={() => aoMudar(!marcado)}>
      <View style={[styles.caixa, { borderColor: corDaCaixa }, marcado && { backgroundColor: corDaCaixa }]}>
        {marcado && <Text style={styles.visto}>✓</Text>}
      </View>
      <Text style={styles.texto}>{children}</Text>
    </Pressable>
  );
}
