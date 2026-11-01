import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  seta: {
    fontSize: 24,
    color: colors.texto,
    marginRight: 8,
  },
  titulo: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.texto,
  },
});
