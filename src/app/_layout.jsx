import { Stack } from "expo-router";
import { UsuarioLogadoProvider } from "../context/UsuarioLogado";


export default function Layout() {
  return (
    <UsuarioLogadoProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </UsuarioLogadoProvider>
  );
}