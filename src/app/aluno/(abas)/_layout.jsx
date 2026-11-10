import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors } from "../../../styles/theme";

// Ícone de cada aba: cheio quando a aba está aberta, só o contorno quando não está.
function icone(nome) {
  return function IconeDaAba({ focused, color }) {
    return <Ionicons name={focused ? nome : `${nome}-outline`} size={28} color={color} />;
  };
}

// Barra inferior do aluno (protótipo: Início, Histórico, Professores, Perfil).
// Só ícones na tela; o "title" continua sendo lido pelo leitor de tela.
export default function AbasAluno() {
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
      <Tabs.Screen name="historico" options={{ title: "Histórico", tabBarIcon: icone("time") }} />
      <Tabs.Screen name="professores" options={{ title: "Professores", tabBarIcon: icone("people") }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil", tabBarIcon: icone("person") }} />
    </Tabs>
  );
}
