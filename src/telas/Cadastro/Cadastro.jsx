import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { AceiteTermos } from "../../components/AceiteTermos/AceiteTermos";
import { Botao } from "../../components/Botao/Botao";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { Campo } from "../../components/Campo/Campo";
import { Dica } from "../../components/Dica/Dica";
import { SeletorPerfil } from "../../components/SeletorPerfil/SeletorPerfil";
import { CorDaAreaProvider } from "../../context/CorDaArea";
import { cadastrar, mensagemDeErro } from "../../services/autenticacao";
import global from "../../styles/global";
import { colors } from "../../styles/theme";
import styles from "./Cadastro.styles";


// Formato do CREF: 6 números, hífen, G ou P, barra e a sigla do estado. Ex.: 123456-G/CE
const FORMATO_CREF = /^\d{6}-[GP]\/[A-Z]{2}$/;

// Cadastro (RF03): cria a conta no Firebase e salva o perfil, com o código de 4 dígitos.
export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("aluno");
  const [cref, setCref] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // A tela já mostra a cor da área escolhida: laranja para aluno, azul para professor.
  const cor = perfil === "professor" ? colors.primariaProfessor : colors.primaria;
  const crefFormatado = cref.trim().toUpperCase();

  // O botão Cadastrar só acende com todos os campos preenchidos e os termos aceitos (LGPD).
  const camposPreenchidos =
    nome.trim() !== "" &&
    email.trim() !== "" &&
    senha !== "" &&
    (perfil !== "professor" || crefFormatado !== "");
  const podeCadastrar = camposPreenchidos && aceitouTermos;

  // Validação dos campos (RF03.2): devolve o problema encontrado ou null se estiver tudo certo.
  function validar() {
    if (!nome.trim()) return "Informe o seu nome.";
    if (!email.includes("@")) return "Informe um e-mail válido.";
    if (senha.length < 8) return "A senha precisa ter pelo menos 8 caracteres.";
    if (perfil === "professor" && !FORMATO_CREF.test(crefFormatado)) {
      return "Informe o CREF no formato 123456-G/CE.";
    }
    if (!aceitouTermos) return "Para criar a conta, aceite os Termos de Uso.";
    return null;
  }

  async function fazerCadastro() {
    const problema = validar();
    if (problema) {
      setErro(problema);
      return;
    }
    setErro(null);
    setCarregando(true);
    try {
      await cadastrar({ nome: nome.trim(), email: email.trim(), senha, perfil, cref: crefFormatado, aceitouTermos });
      router.replace(perfil === "professor" ? "/professor" : "/aluno");
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setCarregando(false);
    }
  }

  return (
    <CorDaAreaProvider value={cor}>
      <ScrollView style={global.tela} contentContainerStyle={styles.conteudo}>
        <Cabecalho titulo="Criar conta" />

        <Text style={styles.titulo}>Comece sua jornada</Text>
        <Text style={styles.subtitulo}>Preencha os dados para criar sua conta no MoveFit.</Text>

        <Campo rotulo="Nome completo" placeholder="Ex.: João Silva" valor={nome} aoMudarTexto={setNome} />

        <Campo
          rotulo="E-mail"
          placeholder="email@exemplo.com"
          valor={email}
          aoMudarTexto={setEmail}
          tipoTeclado="email-address"
        />

        <Campo
          rotulo="Senha"
          placeholder="Mínimo de 8 caracteres"
          valor={senha}
          aoMudarTexto={setSenha}
          senha
        />

        <Text style={styles.rotuloPerfil}>Eu sou</Text>
        <SeletorPerfil valor={perfil} aoMudar={setPerfil} />

        {perfil === "professor" && (
          <Campo rotulo="CREF" placeholder="Ex.: 123456-G/CE" valor={cref} aoMudarTexto={setCref} />
        )}

        <Text style={styles.observacao}>
          Ao concluir, o app gera o seu código de 4 dígitos para vínculo entre aluno e professor.
        </Text>

        <AceiteTermos
          marcado={aceitouTermos}
          aoMudar={setAceitouTermos}
          aoAbrirTermos={() => router.push("/termos")}
        />

        {erro && (
          <View style={styles.erro}>
            <Dica texto={erro} />
          </View>
        )}

        <Botao
          texto={carregando ? "Cadastrando..." : "Cadastrar"}
          onPress={fazerCadastro}
          desativado={carregando || !podeCadastrar}
        />

        {!podeCadastrar && (
          <Text style={styles.aviso}>Preencha todos os campos e aceite os termos para continuar.</Text>
        )}

        <Pressable style={styles.entrar} onPress={() => router.replace("/login")}>
          <Text style={styles.textoEntrar}>
            Já tem uma conta? <Text style={[styles.link, { color: cor }]}>Entrar</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </CorDaAreaProvider>
  );
}
