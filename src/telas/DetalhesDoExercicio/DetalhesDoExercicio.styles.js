import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  conteudo: {
    paddingBottom: 40,
  },
  grupo: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primaria,
    marginTop: 12,
  },
  linhaInfo: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  infoTexto: {
    fontSize: 13,
    color: colors.textoMuted,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.texto,
    marginBottom: 8,
  },
  passo: {
    fontSize: 14,
    color: colors.texto,
    marginBottom: 8,
    lineHeight: 20,
  },
  aviso: {
    fontSize: 15,
    color: colors.textoMuted,
    marginTop: 16,
  },
});
