import { Pressable, Text } from "react-native";
import { useCorDaArea } from "../../context/CorDaArea";
import { colors } from "../../styles/theme";
import styles from "./Botao.styles";

// "secundario" deixa o botão só com contorno.
// "perigo" usa o vermelho padrão das ações destrutivas (Sair, Excluir).
export function Botao({ texto, onPress, secundario, perigo }) {
  const corDaArea = useCorDaArea();
  const cor = perigo ? colors.perigo : corDaArea;

  return (
    <Pressable
      style={[
        styles.botao,
        { backgroundColor: cor },
        secundario && styles.botaoSecundario,
        secundario && { borderColor: cor },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.texto, secundario && styles.textoSecundario, secundario && { color: cor }]}>
        {texto}
      </Text>
    </Pressable>
  );
}
