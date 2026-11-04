import { useRef, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BalaoMensagem } from "../../components/BalaoMensagem/BalaoMensagem";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { CaixaMensagem } from "../../components/CaixaMensagem/CaixaMensagem";
import { ContextoTreino } from "../../components/ContextoTreino/ContextoTreino";
import { Dica } from "../../components/Dica/Dica";
import { perguntarGemini } from "../../services/gemini";
import global from "../../styles/global";
import dados from "../InicioAluno/dados.json";
import styles from "./Assistente.styles";

// Aviso fixo exigido pelo RF08.2.
const AVISO = "As orientações da IA são informativas. Em caso de dor persistente, consulte o professor na academia.";

// Assistente do aluno (RF08): tira dúvidas usando o treino escolhido como contexto (RF08.1).
// TODO: trocar o dados.json pelos treinos do aluno logado vindos do Firebase.
export default function Assistente() {
  const [treino, setTreino] = useState(dados.treinos[0]);
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const lista = useRef(null);

  // Primeira mensagem: é só visual, não vai para o Gemini.
  const boasVindas = {
    id: "boas-vindas",
    autor: "ia",
    texto: `Olá! Sou o Assistente MoveFit. Hoje seu treino é ${treino.nome}. Como posso ajudar com a execução dos exercícios?`,
  };

  async function enviar() {
    const pergunta = texto.trim();
    if (!pergunta || carregando) return;

    const novaMensagem = { id: String(Date.now()), autor: "usuario", texto: pergunta };
    const conversa = [...mensagens, novaMensagem];

    setMensagens(conversa);
    setTexto("");
    setErro("");
    setCarregando(true);

    try {
      const resposta = await perguntarGemini(conversa, treino.nome);
      setMensagens((atual) => [...atual, { id: String(Date.now()), autor: "ia", texto: resposta }]);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={global.tela} edges={["top", "bottom"]}>
      <Cabecalho titulo="Assistente MoveFit" />

      <ContextoTreino treinos={dados.treinos} selecionado={treino} aoSelecionar={setTreino} />

      <KeyboardAvoidingView
        style={styles.conteudo}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          ref={lista}
          data={[boasVindas, ...mensagens]}
          keyExtractor={(mensagem) => mensagem.id}
          renderItem={({ item }) => <BalaoMensagem autor={item.autor} texto={item.texto} />}
          onContentSizeChange={() => lista.current?.scrollToEnd({ animated: true })}
          contentContainerStyle={styles.lista}
          ListFooterComponent={
            <>
              {carregando && <Text style={styles.digitando}>Assistente está digitando...</Text>}
              {erro !== "" && <Dica texto={erro} />}
            </>
          }
        />

        <View style={styles.aviso}>
          <Dica texto={AVISO} />
        </View>

        <CaixaMensagem
          valor={texto}
          aoMudarTexto={setTexto}
          aoEnviar={enviar}
          desativado={carregando}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
