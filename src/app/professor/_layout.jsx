import { Stack } from "expo-router";
import { CorDaAreaProvider } from "../../context/CorDaArea";
import { colors } from "../../styles/theme";

// Pilha da área: as abas ficam por baixo e as telas de detalhe abrem por cima delas.
// Toda a área do professor usa o azul como cor de destaque (no aluno é o laranja).
export default function Layout() {
  return (
    <CorDaAreaProvider value={colors.primariaProfessor}>
      <Stack screenOptions={{ headerShown: false }} />
    </CorDaAreaProvider>
  );
}
