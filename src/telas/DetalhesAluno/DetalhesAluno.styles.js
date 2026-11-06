import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  rolagem: {
    flex: 1,
  },
  conteudo: {
    paddingBottom: 24,
  },
  secao: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.texto,
    marginTop: 24,
    marginBottom: 12,
  },
  grupo: {
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    paddingHorizontal: 14,
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