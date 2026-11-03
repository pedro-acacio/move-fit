import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  cartao: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
  },
  info: {
    flex: 1,
  },
  titulo: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.texto,
  },
  detalhe: {
    fontSize: 15,
    color: colors.textoMuted,
    marginTop: 4,
  },
  seta: {
    fontSize: 24,
    color: colors.textoMuted,
    marginLeft: 12,
  },
});
