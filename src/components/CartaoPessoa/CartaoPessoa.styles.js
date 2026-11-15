import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  cartao: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
    semBorda: {
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  moldura: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: colors.primaria,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  nome: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.texto,
  },
  detalhe: {
    fontSize: 13,
    color: colors.textoMuted,
    marginTop: 4,
  },
  seta: {
    fontSize: 24,
    color: colors.texto,
  },
});