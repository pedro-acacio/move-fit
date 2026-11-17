import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, KeyboardAvoidingView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BalaoMensagem } from "../../components/BalaoMensagem/BalaoMensagem";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { CaixaMensagem } from "../../components/CaixaMensagem/CaixaMensagem";
import { ContextoTreino } from "../../components/ContextoTreino/ContextoTreino";
import { Dica } from "../../components/Dica/Dica";
import { perguntarGemini } from "../../services/gemini";
import { observarTreinosDoAluno } from "../../services/treinosService";
import global from "../../styles/global";
import styles from "./Assistente.styles";


const AVISO = "As orientações da IA são informativas. Em caso de dor persistente, consulte o professor na academia.";


export default function Assistente() {

  const params = useLocalSearchParams();
  const [treinos, setTreinos] = useState([]);
  const [treinoId, setTreinoId] = useState(params.treino);
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const lista = useRef(null);

  useEffect(() => observarTreinosDoAluno(setTreinos), []);


  const treino = treinos.find((item) => item.id === treinoId) ?? treinos[0] ?? null;


  const boasVindas = {
    id: "boas-vindas",
    autor: "ia",
    texto: treino
      ? `Olá! Sou o Assistente MoveFit. Hoje seu treino é ${treino.nome}. Como posso ajudar com a execução dos exercícios?`
      : "Olá! Sou o Assistente MoveFit. Como posso ajudar com a execução dos exercícios?",
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
      const resposta = await perguntarGemini(conversa, treino?.nome ?? "nenhum treino enviado");
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

      {treino && (
        <ContextoTreino treinos={treinos} selecionado={treino} aoSelecionar={(novo) => setTreinoId(novo.id)} />
      )}

      <KeyboardAvoidingView style={styles.conteudo} behavior="padding">
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
