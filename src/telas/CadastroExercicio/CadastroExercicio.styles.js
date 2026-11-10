import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  rolagem: {
    flex: 1,
  },
  conteudo: {
    paddingBottom: 24,
  },
  observacao: {
    fontSize: 13,
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
