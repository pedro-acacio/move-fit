import { Text, View } from "react-native";
import styles from "./SeloStatus.styles";

// Selo arredondado com o status do aluno: "ativo" (cheio) ou "pendente" (só contorno).
export function SeloStatus({ status, texto }) {
  const ativo = status === "ativo";

  return (
    <View style={[styles.selo, ativo && styles.seloAtivo]}>
      <Text style={[styles.texto, ativo && styles.textoAtivo]}>
        {texto ?? (ativo ? "Ativo" : "Pendente")}
      </Text>
    </View>
  );
}
