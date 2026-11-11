import { router, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";
import styles from "./Cabecalho.styles";

// Para onde a seta leva quando não existe tela anterior na pilha
// (acontece depois de recarregar o app ou de abrir a tela direto pelo endereço).
function inicioDaArea(caminho) {
  if (caminho.startsWith("/aluno")) return "/aluno";
  if (caminho.startsWith("/professor")) return "/professor";
  return "/login";
}

export function Cabecalho({ titulo, aoVoltar }) {
  const caminho = usePathname();

  function voltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(inicioDaArea(caminho));
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={aoVoltar ?? voltar} hitSlop={12}>
        <Text style={styles.seta}>‹</Text>
      </Pressable>
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  );
}
