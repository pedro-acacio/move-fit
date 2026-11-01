import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    padding: 4,
  },
  opcao: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  opcaoSelecionada: {
    backgroundColor: colors.primaria,
  },
  texto: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.texto,
  },
  textoSelecionado: {
    color: colors.fundo,
  },
});
