import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  botao: {
    backgroundColor: colors.primaria,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  texto: {
    color: colors.fundo,
    fontSize: 16,
    fontWeight: "600",
  },
});
