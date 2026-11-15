import { Pressable, Text, View } from "react-native";
import { useCorDaArea } from "../../context/CorDaArea";
import styles from "./AceiteTermos.styles";

// Caixinha "Li e aceito os Termos de Uso", usada no Cadastro.
// Tocar na caixa ou no texto marca/desmarca. O trecho sublinhado abre os termos completos.
export function AceiteTermos({ marcado, aoMudar, aoAbrirTermos }) {
  const cor = useCorDaArea();

  return (
    <Pressable style={styles.linha} onPress={() => aoMudar(!marcado)}>
      <View style={[styles.caixa, { borderColor: cor }, marcado && { backgroundColor: cor }]}>
        {marcado && <Text style={styles.visto}>✓</Text>}
      </View>

      <Text style={styles.texto}>
        Li e aceito os{" "}
        <Text style={[styles.link, { color: cor }]} onPress={aoAbrirTermos}>
          Termos de Uso e a Política de Privacidade
        </Text>
        , e concordo com o uso dos meus dados como descrito neles.
      </Text>
    </Pressable>
  );
}
