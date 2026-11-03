import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  caixa: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.dica,
    backgroundColor: colors.dicaFundo,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  texto: {
    fontSize: 14,
    color: colors.dica,
  },
});
