import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  caixa: {
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  linha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  texto: {
    flex: 1,
    fontSize: 14,
    color: colors.texto,
  },
  acao: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primaria,
  },
  opcao: {
    paddingVertical: 10,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: colors.borda,
  },
  opcaoTexto: {
    fontSize: 15,
    color: colors.texto,
  },
  opcaoAtual: {
    fontWeight: "700",
    color: colors.primaria,
  },
});
