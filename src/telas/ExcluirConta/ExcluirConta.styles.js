import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  conteudo: {
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.perigo,
    marginTop: 8,
  },
  aviso: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.texto,
    marginTop: 8,
    marginBottom: 16,
  },
  lista: {
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  item: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.texto,
    marginBottom: 6,
  },
  erro: {
    fontSize: 14,
    color: colors.perigo,
    marginBottom: 16,
  },
  botoes: {
    marginTop: 8,
  },
  espaco: {
    height: 12,
  },
});
