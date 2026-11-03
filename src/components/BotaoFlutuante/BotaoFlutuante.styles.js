import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  botao: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: colors.primaria,
    borderRadius: 28,
    paddingHorizontal: 22,
    paddingVertical: 16,
  },
  texto: {
    color: colors.fundo,
    fontSize: 16,
    fontWeight: "600",
  },
});
