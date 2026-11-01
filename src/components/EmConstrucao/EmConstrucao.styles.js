import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.texto,
  },
  aviso: {
    fontSize: 16,
    color: colors.textoMuted,
  },
});
