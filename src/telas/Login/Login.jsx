import { Redirect, router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Botao } from "../../components/Botao/Botao";
import { Campo } from "../../components/Campo/Campo";
import { entrar, mensagemDeErro } from "../../services/autenticacao";
import global from "../../styles/global";
import styles from "./Login.styles";
import { areaDoUsuario, useUsuarioLogado } from "../../context/UsuarioLogado";

// Login (RF02): entra com e-mail e senha no Firebase e leva para a área do perfil da conta.
export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const { usuario, carregando: verificando } = useUsuarioLogado();

  async function fazerLogin() {
    if (!email.trim() || !senha) {
      setErro("Preencha o e-mail e a senha.");
      return;
    }
    setErro(null);
    setCarregando(true);
    try {
      await entrar(email.trim(), senha);
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setCarregando(false);
    }
  }

  // Se já existe alguém logado (sessão salva ou login que acabou de dar certo), vai direto para a área.
  if (verificando) return null;
  if (usuario) return <Redirect href={areaDoUsuario(usuario)} />;

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

      <Botao texto={carregando ? "Entrando..." : "Entrar"} onPress={carregando ? undefined : fazerLogin} />

      <Pressable style={styles.cadastro} onPress={() => router.push("/cadastro")}>
        <Text style={styles.textoCadastro}>
          Não tem uma conta? <Text style={styles.link}>Cadastre-se</Text>
        </Text>
      </Pressable>
    </ScrollView>
  );
}
