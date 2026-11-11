import { Redirect, Stack } from "expo-router";
import { areaDoUsuario, useUsuarioLogado } from "../../context/UsuarioLogado";

// Pilha da área: as abas ficam por baixo e as telas de detalhe abrem por cima delas.
// Só entra aqui quem está logado como aluno. Os outros vão para a área certa (ou para o Login).
export default function Layout(){
  const { usuario, carregando } = useUsuarioLogado();

  if(carregando) return null;
  if(areaDoUsuario(usuario) !== "/aluno") return <Redirect href={areaDoUsuario(usuario)} />;

  return <Stack screenOptions={{headerShown: false}} />;
}