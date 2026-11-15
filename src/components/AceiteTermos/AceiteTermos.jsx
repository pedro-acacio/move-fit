import { Text } from "react-native";
import { useCorDaArea } from "../../context/CorDaArea";
import { CaixaMarcar } from "../CaixaMarcar/CaixaMarcar";
import styles from "./AceiteTermos.styles";

// "Li e aceito os Termos de Uso", usado no Cadastro.
// O trecho sublinhado abre os termos completos.
export function AceiteTermos({ marcado, aoMudar, aoAbrirTermos }) {
  const cor = useCorDaArea();

  return (
    <CaixaMarcar marcado={marcado} aoMudar={aoMudar}>
      Li e aceito os{" "}
      <Text style={[styles.link, { color: cor }]} onPress={aoAbrirTermos}>
        Termos de Uso e a Política de Privacidade
      </Text>
      , e concordo com o uso dos meus dados como descrito neles.
    </CaixaMarcar>
  );
}
