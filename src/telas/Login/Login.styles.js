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
    fontSize: 14,
    color: colors.textoMuted,
    marginTop: 6,
    marginBottom: 24,
  },
  link: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primaria,
    textAlign: "center",
    marginTop: 20,
  },
});
