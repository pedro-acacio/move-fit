import { router } from "expo-router";
import { Text, View } from "react-native";
import { Botao } from "../components/Botao/Botao";
import styles from "./index.styles";



export default function HomeScreen() {
  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>MoveFit</Text>
      <Botao texto="Criar conta" onPress={() => router.push("/cadastro")} />
 
      <Botao texto='perfil' onPress={() =>router.push('./perfil')}/>


    </View>
  );
}
