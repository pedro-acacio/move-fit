import { Pressable, Text, TextInput, View } from "react-native";
import { colors } from "../../styles/theme";
import styles from "./CaixaMensagem.styles";

// Campo de digitar a mensagem + botão de enviar, usado no rodapé do chat.
export function CaixaMensagem({ valor, aoMudarTexto, aoEnviar, desativado }) {
  const podeEnviar = valor.trim().length > 0 && !desativado;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.entrada}
        placeholder="Pergunte sobre seu treino..."
        placeholderTextColor={colors.placeholder}
        value={valor}
        onChangeText={aoMudarTexto}
        multiline
        maxLength={500}
      />
      <Pressable
        style={[styles.botao, !podeEnviar && styles.botaoDesativado]}
        onPress={aoEnviar}
        disabled={!podeEnviar}
      >
        <Text style={styles.textoBotao}>Enviar</Text>
      </Pressable>
    </View>
  );
}
