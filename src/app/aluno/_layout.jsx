import { Redirect, Stack } from "expo-router";
import { areaDoUsuario, useUsuarioLogado } from "../../context/UsuarioLogado";



export default function Layout(){
  const { usuario, carregando } = useUsuarioLogado();

  if(carregando) return null;
  if(areaDoUsuario(usuario) !== "/aluno") return <Redirect href={areaDoUsuario(usuario)} />;

  return <Stack screenOptions={{headerShown: false}} />;
}