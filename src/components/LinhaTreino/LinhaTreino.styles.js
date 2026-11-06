import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  linha: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  divisor: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borda,
  },
  nome: {
    flex: 1,
    fontSize: 15,
    color: colors.texto,
    marginRight: 12,
  },
  info: {
    fontSize: 13,
    color: colors.textoMuted,
  },
});