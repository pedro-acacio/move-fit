import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  rolagem: {
    flex: 1,
  },
  conteudo: {
    paddingBottom: 24,
  },
  subtitulo: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.texto,
  },
  professor: {
    fontSize: 15,
    color: colors.textoMuted,
    marginTop: 4,
  },
  progresso: {
    gap: 8,
    marginTop: 16,
    marginBottom: 20,
  },
  progressoTexto: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.texto,
  },
  vazio: {
    fontSize: 15,
    color: colors.textoMuted,
  },
  rodape: {
    gap: 12,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borda,
  },
});
