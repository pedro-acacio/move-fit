import { Pressable, Text, TextInput, View } from "react-native";
import { colors } from "../../styles/theme";
import { useCorDaArea } from "../../context/CorDaArea";
import styles from "./CaixaMensagem.styles";


export function CaixaMensagem({ valor, aoMudarTexto, aoEnviar, desativado, placeholder = "Pergunte sobre seu treino..." }) {
  const cor = useCorDaArea();
  const podeEnviar = valor.trim().length > 0 && !desativado;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.entrada}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        value={valor}
        onChangeText={aoMudarTexto}
        multiline
        maxLength={500}
      />
      <Pressable
        style={[styles.botao, { backgroundColor: cor }, !podeEnviar && styles.botaoDesativado]}
        onPress={aoEnviar}
        disabled={!podeEnviar}
      >
        <Text style={styles.textoBotao}>Enviar</Text>
      </Pressable>
    </View>
  );
}
