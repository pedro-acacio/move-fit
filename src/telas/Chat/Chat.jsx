import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, KeyboardAvoidingView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BalaoMensagem } from "../../components/BalaoMensagem/BalaoMensagem";
import { CaixaMensagem } from "../../components/CaixaMensagem/CaixaMensagem";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { useUsuarioLogado } from "../../context/UsuarioLogado";
import { enviarMensagem, observarConversa } from "../../services/chatService";
import { observarAlunosDoProfessor, observarProfessoresDoAluno } from "../../services/vinculoService";
import global from "../../styles/global";
import styles from "./Chat.styles";



export default function Chat({ tipo }) {
    const { id } = useLocalSearchParams();
    const { usuario } = useUsuarioLogado();

    const [contatos, setContatos] = useState(null);
    const [mensagens, setMensagens] = useState([]);
    const [texto, setTexto] = useState("");
    const lista = useRef(null);


    const alunoId = tipo === "aluno" ? usuario.uid : id;
    const professorId = tipo === "professor" ? usuario.uid : id;


    useEffect(
        () => (tipo === "aluno" ? observarProfessoresDoAluno(setContatos) : observarAlunosDoProfessor(setContatos)),
        [tipo]
    );

    useEffect(() => observarConversa(alunoId, professorId, setMensagens), [alunoId, professorId]);

    const contato = contatos?.find((item) => item.id === id);

    async function enviar() {
        const conteudo = texto.trim();
        if (!conteudo) return;

        setTexto("");
        try {
            await enviarMensagem(alunoId, professorId, conteudo);
        } catch {
            setTexto(conteudo);
        }
    }

    if (contatos !== null && !contato) {
        return (
            <SafeAreaView style={global.tela} edges={["top", "bottom"]}>
                <Cabecalho titulo="Chat" />
                <Text style={styles.dia}>Conversa não encontrada.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={global.tela} edges={["top", "bottom"]}>
            <Cabecalho titulo={contato?.nome ?? "Carregando..."} fotoDe={contato?.id} />

            <KeyboardAvoidingView style={styles.conteudo} behavior="padding">
                <FlatList
                    ref={lista}
                    onContentSizeChange={() => lista.current?.scrollToEnd({ animated: true })}
                    style={styles.lista}
                    contentContainerStyle={styles.listaConteudo}
                    data={mensagens}
                    keyExtractor={(mensagem) => mensagem.id}
                    ListEmptyComponent={
                        <Text style={styles.dia}>Nenhuma mensagem ainda. Envie a primeira!</Text>
                    }
                    renderItem={({ item }) => (
                        <BalaoMensagem
                            autor={item.autorId === usuario.uid ? "usuario" : "ia"}
                            texto={item.texto}
                        />
                    )}
                />

                <CaixaMensagem
                    placeholder="Digite sua mensagem..."
                    valor={texto}
                    aoMudarTexto={setTexto}
                    aoEnviar={enviar}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
