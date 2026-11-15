import { Pressable, Text, View } from "react-native";
import { useCorDaArea } from "../../context/CorDaArea";
import styles from "./CaixaMarcar.styles";

// Caixinha de marcar com um texto ao lado (ex.: aceitar os termos, confirmar a exclusão da conta).
// Tocar na caixa ou no texto marca/desmarca. O texto vem em "children" e pode ter partes em destaque.
// "cor" é opcional: por padrão usa a cor da área (laranja no aluno, azul no professor).
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
