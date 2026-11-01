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
  rotuloPerfil: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.texto,
    marginBottom: 8,
  },
  observacao: {
    fontSize: 13,
    color: colors.textoMuted,
    marginTop: 16,
    marginBottom: 24,
  },
});
