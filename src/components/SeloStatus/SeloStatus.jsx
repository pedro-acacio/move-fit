import { Text, View } from "react-native";
import { useCorDaArea } from "../../context/CorDaArea";
import styles from "./SeloStatus.styles";


export function SeloStatus({ status, texto }) {
  const ativo = status === "ativo";
  const cor = useCorDaArea();

  return (
    <View style={[styles.selo, ativo && styles.seloAtivo, ativo && { backgroundColor: cor, borderColor: cor }]}>
      <Text style={[styles.texto, ativo && styles.textoAtivo]}>
        {texto ?? (ativo ? "Ativo" : "Pendente")}
      </Text>
    </View>
  );
}
