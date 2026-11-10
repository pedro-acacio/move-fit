import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  rolagem: {
    flex: 1,
  },
  conteudo: {
    paddingBottom: 24,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.texto,
    marginBottom: 8,
  },
  secao: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.texto,
    marginTop: 24,
    marginBottom: 12,
  },
  vazio: {
    fontSize: 15,
    color: colors.textoMuted,
  },
  erro: {
    marginTop: 16,
  },
  rodape: {
    gap: 12,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borda,
  },
});
