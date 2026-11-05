import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  cartao: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  foto: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.primaria,
    backgroundColor: colors.borda,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  fotoTexto: {
    fontSize: 11,
    color: colors.texto,
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  nome: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.texto,
  },
  detalhe: {
    fontSize: 13,
    color: colors.textoMuted,
    marginTop: 4,
  },
  seta: {
    fontSize: 24,
    color: colors.texto,
  },
});