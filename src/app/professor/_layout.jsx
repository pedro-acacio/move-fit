import { Redirect, Stack } from "expo-router";
import { CorDaAreaProvider } from "../../context/CorDaArea";
import { areaDoUsuario, useUsuarioLogado } from "../../context/UsuarioLogado";
import { colors } from "../../styles/theme";

// Pilha da área: as abas ficam por baixo e as telas de detalhe abrem por cima delas.
// Toda a área do professor usa o azul como cor de destaque (no aluno é o laranja).
// Só entra aqui quem está logado como professor. Os outros vão para a área certa (ou para o Login).

export default function Layout() {
  const { usuario, carregando } = useUsuarioLogado();

  if (carregando) return null;
  if (areaDoUsuario(usuario) !== "/professor") return <Redirect href={areaDoUsuario(usuario)} />;

  return (
    <CorDaAreaProvider value={colors.primariaProfessor}>
      <Stack screenOptions={{headerShown : false}} />
    </CorDaAreaProvider>
  );
}