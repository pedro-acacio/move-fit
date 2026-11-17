import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import global from "../../styles/global";
import { Cabecalho } from "../Cabecalho/Cabecalho";
import styles from "./EmConstrucao.styles";



export function EmConstrucao({ titulo, voltar }) {
  return (
    <SafeAreaView style={global.tela}>
      {voltar && <Cabecalho titulo={titulo} />}
      <View style={styles.centro}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.aviso}>Tela em construção</Text>
      </View>
    </SafeAreaView>
  );
}
