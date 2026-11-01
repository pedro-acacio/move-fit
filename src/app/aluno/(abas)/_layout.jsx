import { Tabs } from "expo-router";
import { colors } from "../../../styles/theme";

// Barra inferior do aluno (protótipo: Início, Histórico, Professores, Perfil).
export default function AbasAluno() {
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
      <Tabs.Screen name="historico" options={{ title: "Histórico" }} />
      <Tabs.Screen name="professores" options={{ title: "Professores" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
