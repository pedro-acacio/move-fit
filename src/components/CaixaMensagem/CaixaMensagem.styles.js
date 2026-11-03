import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borda,
  },
  entrada: {
    flex: 1,
    maxHeight: 110,
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.texto,
  },
  botao: {
    marginLeft: 8,
    backgroundColor: colors.primaria,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  botaoDesativado: {
    opacity: 0.4,
  },
  textoBotao: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.fundo,
  },
});
