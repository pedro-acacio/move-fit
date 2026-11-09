import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.texto,
    paddingVertical: 16,
  },
  lista: {
    paddingBottom: 96,
  },
  vazio: {
    fontSize: 15,
    color: colors.textoMuted,
  },
});