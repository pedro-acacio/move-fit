import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  selo: {
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  seloAtivo: {
    backgroundColor: colors.primaria,
    borderColor: colors.primaria,
  },
  texto: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textoMuted,
  },
  textoAtivo: {
    color: colors.fundo,
  },
});
