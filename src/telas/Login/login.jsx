import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { Botao } from "../components/Botao/Botao";
import { Cabecalho } from "../components/Cabecalho/Cabecalho";
import { Campo } from "../components/Campo/Campo";
import global from "../styles/global";
import styles from "../telas/Login/Login.styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // TODO: validar os campos e autenticar o usuário
  function entrar() {}

  return (
    <ScrollView style={global.tela} contentContainerStyle={styles.conteudo}>
      <Cabecalho titulo="Entrar" />

      <Text style={styles.titulo}>Bem-vindo de volta</Text>
      <Text style={styles.subtitulo}>Acesse sua conta no MoveFit.</Text>

      <Campo
        rotulo="E-mail"
        placeholder="email@exemplo.com"
        valor={email}
        aoMudarTexto={setEmail}
        tipoTeclado="email-address"
      />

      <Campo
        rotulo="Senha"
        placeholder="Digite sua senha"
        valor={senha}
        aoMudarTexto={setSenha}
        senha
      />

      <Botao texto="Entrar" onPress={entrar} />

      <Pressable onPress={() => router.push("/cadastro")}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </Pressable>
    </ScrollView>
  );
}
