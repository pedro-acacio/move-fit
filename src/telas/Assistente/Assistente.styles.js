import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  conteudo: {
    flex: 1,
  },
  lista: {
    paddingBottom: 12,
  },
  digitando: {
    fontSize: 13,
    fontStyle: "italic",
    color: colors.textoMuted,
    marginBottom: 10,
  },
});
