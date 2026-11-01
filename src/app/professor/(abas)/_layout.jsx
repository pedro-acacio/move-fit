import { Tabs } from "expo-router";
import { colors } from "../../../styles/theme";

// Barra inferior do professor (protótipo: Início, Treinos, Exercícios, Alunos, Perfil).
export default function AbasProfessor() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primaria,
        tabBarInactiveTintColor: colors.textoMuted,
        tabBarIconStyle: { display: "none" },
        tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Início" }} />
      <Tabs.Screen name="treinos" options={{ title: "Treinos" }} />
      <Tabs.Screen name="exercicios" options={{ title: "Exercícios" }} />
      <Tabs.Screen name="alunos" options={{ title: "Alunos" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
