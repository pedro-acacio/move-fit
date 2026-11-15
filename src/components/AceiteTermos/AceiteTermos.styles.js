import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  linha: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  caixa: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primaria,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 1,
  },
  visto: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.fundo,
  },
  texto: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: colors.texto,
  },
  link: {
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
