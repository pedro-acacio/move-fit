import { router } from "expo-router";
import { Botao } from "../../components/Botao/Botao";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { Campo } from "../../components/Campo/Campo";
import global from "../../styles/global";
import styles from "./RecuperarSenha.styles";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { mensagemDeErro, recuperarSenha } from "../../services/autenticacao";


export default function RecuperarSenha() {

    const [email, setEmail] = useState("");
    const [erro, setErro] = useState(null);
    const [enviado, setEnviado] = useState(false);

    async function enviar() {
        if (!email.includes("@")) {
            setErro("Informe um e-mail válido.");
            return;
        }

        setErro(null);
        try {
            await recuperarSenha(email.trim());
            setEnviado(true);
        } catch (e) {
            setErro(mensagemDeErro(e));
        }
    }

    return (
        <ScrollView style={global.tela} contentContainerStyle={styles.conteudo}>
            <Cabecalho titulo="Recuperar senha" />

            <Text style={styles.titulo}>Esqueceu a senha?</Text>
            <Text style={styles.subtitulo}>Informe o e-mail da sua conta. Enviaremos
                um link para você criar uma nova senha.</Text>

            <Campo
                rotulo="E-mail"
                placeholder="email@exemplo.com"
                tipoTeclado="email-address"
                valor={email}
                aoMudarTexto={setEmail}
                erro={erro}
            />

            <Botao texto="Enviar link de redefinição" onPress={enviar} />
            {enviado && (
                <View style={styles.sucesso}>
                    <Text style={styles.sucessoTexto}>
                        Se este e-mail estiver cadastrado, você vai receber um link para criar uma nova senha. Verifique também o spam.
                    </Text>
                </View>
            )}
            <Pressable style={styles.voltar} onPress={() =>
                (router.canGoBack() ? router.back() : router.replace("/login"))}>
                <Text style={styles.link}>Voltar ao login</Text>
            </Pressable>
        </ScrollView>
    );
}