import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors } from "../../../styles/theme";

// Ícone de cada aba: cheio quando a aba está aberta, só o contorno quando não está.
function icone(nome) {
  return function IconeDaAba({ focused, color }) {
    return <Ionicons name={focused ? nome : `${nome}-outline`} size={28} color={color} />;
  };
}

// Barra inferior do professor (protótipo: Início, Treinos, Exercícios, Alunos, Perfil).
// Só ícones na tela; o "title" continua sendo lido pelo leitor de tela.
export default function AbasProfessor() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primaria,
        tabBarInactiveTintColor: colors.textoMuted,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Início", tabBarIcon: icone("home") }} />
      <Tabs.Screen name="treinos" options={{ title: "Treinos", tabBarIcon: icone("barbell") }} />
      <Tabs.Screen name="exercicios" options={{ title: "Exercícios", tabBarIcon: icone("list") }} />
      <Tabs.Screen name="alunos" options={{ title: "Alunos", tabBarIcon: icone("people") }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil", tabBarIcon: icone("person") }} />
    </Tabs>
  );
}
