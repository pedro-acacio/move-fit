import { StyleSheet } from "react-native";
import { colors } from "../styles/theme";

export default StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: colors.fundo,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.texto,
  },
});
