import { Redirect, Stack } from "expo-router";
import { CorDaAreaProvider } from "../../context/CorDaArea";
import { areaDoUsuario, useUsuarioLogado } from "../../context/UsuarioLogado";
import { colors } from "../../styles/theme";





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