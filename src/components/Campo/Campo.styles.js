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
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  entrada: {
    flex: 1,
    fontSize: 15,
    color: colors.texto,
  },
  acao: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primaria,
    marginLeft: 12,
  },
  dica: {
    marginTop: 8,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.dica,
    backgroundColor: colors.dicaFundo,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dicaTexto: {
    fontSize: 13,
    color: colors.dica,
  },
});
