import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  cartao: {
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.texto,
  },
  descricao: {
    fontSize: 13,
    color: colors.textoMuted,
    marginTop: 4,
  },
  acoes: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  acao: {
    borderWidth: 1,
    borderColor: colors.primaria,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  acaoTexto: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primaria,
  },
});