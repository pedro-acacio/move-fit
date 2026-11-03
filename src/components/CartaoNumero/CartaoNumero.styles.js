import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  cartao: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  valor: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.texto,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textoMuted,
    marginTop: 4,
    textAlign: "center",
  },
});
