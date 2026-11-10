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
  const [erro, setErro] = useState(null);

  // TODO: autenticar com o Firebase (RF02.2) e descobrir o perfil pelo banco.
  // Por enquanto, para testar o fluxo: e-mail com "prof" entra como professor, o resto como aluno.
  function entrar() {
    if (!email.includes("@") || senha.length === 0) {
      setErro("E-mail ou senha incorretos.");
      return;
    }
    setErro(null);
    router.replace(email.toLowerCase().includes("prof") ? "/professor" : "/aluno");
  }

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
        erro={erro}
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
