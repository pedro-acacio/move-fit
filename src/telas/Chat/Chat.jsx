import { FlatList, KeyboardAvoidingView, Platform, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BalaoMensagem } from "../../components/BalaoMensagem/BalaoMensagem";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import global from "../../styles/global";
import styles from "./Chat.styles";
import dados from "./dados.json";
import { useRef, useState } from "react";
import { CaixaMensagem } from "../../components/CaixaMensagem/CaixaMensagem";

// Chat entre aluno e professor (RF20). A prop "tipo" diz quem está usando a tela.
// TODO: trocar o dados.json pelas mensagens em tempo real do Firebase, usando o id da rota.
export default function Chat({ tipo }) {
    const [mensagens, setMensagens] = useState(dados.mensagens);
    const [texto, setTexto] = useState("");
    const lista = useRef(null);

    function enviar() {
        const conteudo = texto.trim();
        if (!conteudo) return;

        const nova = { id: String(Date.now()), autor: tipo, texto: conteudo };
        setMensagens([...mensagens, nova]);
        setTexto("");
    }

    return (
        <SafeAreaView style={global.tela} edges={["top", "bottom"]}>
            <Cabecalho titulo={dados.contato[tipo]} />

            <KeyboardAvoidingView
                style={styles.conteudo}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <FlatList
                    ref={lista}
                    onContentSizeChange={() => lista.current?.scrollToEnd({ animated: true })}
                    style={styles.lista}
                    contentContainerStyle={styles.listaConteudo}
                    data={mensagens}
                    keyExtractor={(mensagem) => mensagem.id}
                    ListHeaderComponent={<Text style={styles.dia}>Hoje</Text>}
                    renderItem={({ item }) => (
                        <BalaoMensagem autor={item.autor === tipo ? "usuario" : "ia"} texto={item.texto} />
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
