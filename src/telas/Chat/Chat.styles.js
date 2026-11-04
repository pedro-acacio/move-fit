import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
    conteudo: {
        flex: 1,
    },
    lista: {
        flex: 1,
    },
    listaConteudo: {
        paddingBottom: 12,
    },
    dia: {
        alignSelf: "center",
        fontSize: 13,
        color: colors.textoMuted,
        marginBottom: 12,
    },
});