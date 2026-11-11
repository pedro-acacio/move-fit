import { Stack } from "expo-router";
import { UsuarioLogadoProvider } from "../context/UsuarioLogado";

// O Provider fica em volta de tudo para qualquer tela saber quem está logado.
export default function Layout() {
  return (
    <UsuarioLogadoProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </UsuarioLogadoProvider>
  );
}