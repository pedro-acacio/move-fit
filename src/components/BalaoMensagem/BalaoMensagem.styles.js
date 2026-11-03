import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  balao: {
    maxWidth: "82%",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
  },
  balaoUsuario: {
    alignSelf: "flex-end",
    backgroundColor: colors.primaria,
    borderBottomRightRadius: 4,
  },
  balaoIa: {
    alignSelf: "flex-start",
    backgroundColor: colors.fundo,
    borderWidth: 1,
    borderColor: colors.borda,
    borderBottomLeftRadius: 4,
  },
  textoUsuario: {
    fontSize: 15,
    lineHeight: 21,
    color: colors.fundo,
  },
  textoIa: {
    fontSize: 15,
    lineHeight: 21,
    color: colors.texto,
  },
});
