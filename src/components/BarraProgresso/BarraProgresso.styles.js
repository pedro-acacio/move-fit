import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  trilho: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.borda,
    overflow: "hidden",
  },
  preenchimento: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: colors.primaria,
  },
});
