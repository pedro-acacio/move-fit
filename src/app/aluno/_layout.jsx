import { Stack } from "expo-router";

// Pilha da área: as abas ficam por baixo e as telas de detalhe abrem por cima delas.
export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
