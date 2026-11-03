import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  cartao: {
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titulo: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.texto,
  },
  contagem: {
    fontSize: 15,
    color: colors.textoMuted,
  },
  frase: {
    fontSize: 15,
    color: colors.textoMuted,
  },
});
