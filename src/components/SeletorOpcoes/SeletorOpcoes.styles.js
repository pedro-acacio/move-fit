import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  opcao: {
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  opcaoSelecionada: {
    backgroundColor: colors.primaria,
    borderColor: colors.primaria,
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
