import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Botao } from "../../components/Botao/Botao";
import { Campo } from "../../components/Campo/Campo";
import global from "../../styles/global";
import styles from "./Login.styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // TODO: validar os campos e autenticar o usuário com o Firebase.
  // Se falhar, mostrar "E-mail ou senha incorretos." (prop erro do Campo).
  function entrar() {}

  return (
    <ScrollView style={global.tela} contentContainerStyle={styles.conteudo}>
      <View style={styles.topo}>
        <Text style={styles.marca}>MoveFit</Text>
        <Text style={styles.slogan}>Sua rotina de treino na Academia Unifor</Text>
      </View>

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

      <Pressable style={styles.esqueceu} onPress={() => router.push("/recuperar-senha")}>
        <Text style={styles.link}>Esqueceu a senha?</Text>
      </Pressable>

      <Botao texto="Entrar" onPress={entrar} />

      <Pressable style={styles.cadastro} onPress={() => router.push("/cadastro")}>
        <Text style={styles.textoCadastro}>
          Não tem uma conta? <Text style={styles.link}>Cadastre-se</Text>
        </Text>
      </Pressable>
    </ScrollView>
  );
}
