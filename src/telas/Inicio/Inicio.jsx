import { router } from "expo-router";
import { Text, View } from "react-native";
import { Botao } from "../../components/Botao/Botao";
import styles from "./Inicio.styles";

// Tela temporária: atalhos para navegar pelo app enquanto o login com Firebase não fica pronto.
// Quando o login estiver pronto, esta tela é substituída por ele.
export default function Inicio() {
  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>MoveFit</Text>
      <Botao texto="Entrar" onPress={() => router.push("/login")} />
      <Botao texto="Criar conta" onPress={() => router.push("/cadastro")} />
      <Botao texto="Área do aluno (teste)" onPress={() => router.push("/aluno")} />
      <Botao texto="Área do professor (teste)" onPress={() => router.push("/professor")} />
    </View>
  );
}
