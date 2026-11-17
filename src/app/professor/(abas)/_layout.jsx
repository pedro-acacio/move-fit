import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors } from "../../../styles/theme";


function icone(nome) {
  return function IconeDaAba({ focused, color }) {
    return <Ionicons name={focused ? nome : `${nome}-outline`} size={28} color={color} />;
  };
}



export default function AbasProfessor() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primariaProfessor,
        tabBarInactiveTintColor: colors.textoMuted,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Início", tabBarIcon: icone("home") }} />
      <Tabs.Screen name="treinos" options={{ title: "Treinos", tabBarIcon: icone("barbell") }} />
      <Tabs.Screen name="alunos" options={{ title: "Alunos", tabBarIcon: icone("people") }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil", tabBarIcon: icone("person") }} />
    </Tabs>
  );
}
