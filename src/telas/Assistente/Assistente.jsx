import { useRef, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BalaoMensagem } from "../../components/BalaoMensagem/BalaoMensagem";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { CaixaMensagem } from "../../components/CaixaMensagem/CaixaMensagem";
import { Dica } from "../../components/Dica/Dica";
import { perguntarGemini } from "../../services/gemini";
import global from "../../styles/global";
import styles from "./Assistente.styles";

// Primeira mensagem, mostrada antes de o aluno perguntar algo.
const BOAS_VINDAS = {
  id: "boas-vindas",
  autor: "ia",
  texto: "Oi! Sou a assistente do MoveFit. Posso tirar dúvidas sobre exercícios, montar ideias de treino ou dar dicas de descanso. O que você quer saber?",
};

export default function Assistente() {
  const [mensagens, setMensagens] = useState([BOAS_VINDAS]);
  const [texto, setTexto] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const lista = useRef(null);

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
      // A mensagem de boas-vindas é só visual, não vai para o Gemini.
      const historico = conversa.filter((mensagem) => mensagem.id !== "boas-vindas");
      const resposta = await perguntarGemini(historico);
      setMensagens((atual) => [...atual, { id: String(Date.now()), autor: "ia", texto: resposta }]);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={global.tela} edges={["top", "bottom"]}>
      <Cabecalho titulo="Assistente IA" />

      <KeyboardAvoidingView
        style={styles.conteudo}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          ref={lista}
          data={mensagens}
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
