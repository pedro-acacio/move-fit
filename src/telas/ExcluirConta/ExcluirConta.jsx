import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Botao } from "../../components/Botao/Botao";
import { CaixaMarcar } from "../../components/CaixaMarcar/CaixaMarcar";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { Campo } from "../../components/Campo/Campo";
import { useUsuarioLogado } from "../../context/UsuarioLogado";
import { mensagemDeErro } from "../../services/autenticacao";
import { excluirConta } from "../../services/contaService";
import global from "../../styles/global";
import { colors } from "../../styles/theme";
import styles from "./ExcluirConta.styles";

// O que será apagado, mostrado antes de a pessoa confirmar (precisa bater com o contaService).
const O_QUE_SERA_APAGADO = {
  aluno: [
    "Seu perfil: nome, e-mail, código, foto e as datas do cadastro e do aceite dos termos.",
    "Seu histórico de treinos concluídos e a meta semanal.",
    "Seus vínculos com professores.",
    "Todas as conversas do chat, para você e para o professor.",
    "Os treinos que você recebeu deixam de ter o seu nome e continuam só com o professor.",
  ],
  professor: [
    "Seu perfil: nome, e-mail, código, CREF, foto e as datas do cadastro e do aceite dos termos.",
    "Todos os treinos que você criou, inclusive os enviados aos alunos.",
    "Todos os exercícios que você cadastrou.",
    "Seus vínculos com alunos.",
    "Todas as conversas do chat, para você e para os alunos.",
  ],
};

// Apagar conta (LGPD, art. 18): a pessoa lê o que será apagado, marca que entendeu
// e digita a senha. Só então o botão "Apagar minha conta" acende.
export default function ExcluirConta() {
  const { usuario } = useUsuarioLogado();
  const [entendi, setEntendi] = useState(false);
  const [senha, setSenha] = useState("");
  const [apagando, setApagando] = useState(false);
  const [erro, setErro] = useState("");

  const itens = O_QUE_SERA_APAGADO[usuario?.perfil ?? "aluno"];
  const podeApagar = entendi && senha !== "" && !apagando;

  async function apagar() {
    setErro("");
    setApagando(true);
    try {
      await excluirConta(senha);
      router.replace("/login");
    } catch (e) {
      const senhaErrada = e.code === "auth/invalid-credential" || e.code === "auth/wrong-password";
      setErro(senhaErrada ? "Senha incorreta." : mensagemDeErro(e));
      setApagando(false);
    }
  }

  return (
    <SafeAreaView style={global.tela} edges={["top", "bottom"]}>
      <Cabecalho titulo="Apagar conta" />

      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        <Text style={styles.titulo}>Tem certeza?</Text>
        <Text style={styles.aviso}>
          Esta ação não pode ser desfeita. Os dados abaixo serão apagados para sempre e não
          poderão ser recuperados:
        </Text>

        <View style={styles.lista}>
          {itens.map((item) => (
            <Text key={item} style={styles.item}>
              • {item}
            </Text>
          ))}
        </View>

        <CaixaMarcar marcado={entendi} aoMudar={setEntendi} cor={colors.perigo}>
          Entendo que a minha conta e todos os dados acima serão apagados para sempre.
        </CaixaMarcar>

        <Campo
          rotulo="Digite a sua senha para confirmar"
          placeholder="Sua senha"
          valor={senha}
          aoMudarTexto={setSenha}
          senha
        />

        {erro !== "" && <Text style={styles.erro}>{erro}</Text>}

        <View style={styles.botoes}>
          <Botao
            texto={apagando ? "Apagando..." : "Apagar minha conta"}
            perigo
            desativado={!podeApagar}
            onPress={apagar}
          />
          <View style={styles.espaco} />
          <Botao texto="Cancelar" secundario onPress={() => router.back()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
