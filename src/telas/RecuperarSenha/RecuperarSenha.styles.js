import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
    conteudo: {
        paddingBottom: 40,
    },
    titulo: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.texto,
        marginTop: 8,
    },
    subtitulo: {
        fontSize: 15,
        color: colors.textoMuted,
        marginTop: 6,
        marginBottom: 24, 
    },
    voltar: {
        marginTop: 20,
        alignItems: "center",
    },
    link: {
        fontSize: 15,
        fontWeight: "600",
        color: colors.primaria,
    },
    sucesso: {
        marginTop: 16,
        padding: 12,
        borderRadius: 10,
        backgroundColor: colors.dicaFundo,
    },
    sucessoTexto: {
        fontSize: 15,
        color: colors.dica,
    },
});