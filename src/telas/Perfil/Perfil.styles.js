import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  conteudo: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 40,
  },
  corpo: {
    width: "100%",
    alignItems: "center",
  },
  icone: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.borda,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  iconeTexto: {
    fontSize: 40,
  },
});
