import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  container: {
    width: "100%",
  },
  rotulo: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.texto,
    marginBottom: 8,
  },
  caixa: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  botao: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.dicaFundo,
    alignItems: "center",
    justifyContent: "center",
  },
  seta: {
    fontSize: 14,
    color: colors.primaria,
  },
  valor: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.texto,
  },
});
