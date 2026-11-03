import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  busca: {
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.texto,
    marginTop: 8,
    marginBottom: 16,
  },
  lista: {
    flex: 1,
  },
  listaConteudo: {
    paddingBottom: 16,
  },
  dica: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.dica,
    backgroundColor: colors.dicaFundo,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  dicaTexto: {
    fontSize: 13,
    color: colors.dica,
  },
});
