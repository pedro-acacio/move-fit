import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.texto,
    marginBottom: 8,
  },
  caixa: {
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  valor: {
    fontSize: 15,
    color: colors.texto,
  },
});
