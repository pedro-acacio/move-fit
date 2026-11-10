import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  cartao: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.texto,
  },
  detalhe: {
    fontSize: 14,
    color: colors.textoMuted,
    marginTop: 4,
  },
  remover: {
    borderWidth: 1,
    borderColor: colors.primaria,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 12,
  },
  removerTexto: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primaria,
  },
});
