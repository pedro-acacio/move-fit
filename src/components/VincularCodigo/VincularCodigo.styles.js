import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  cartao: {
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    padding: 16,
  },
  titulo: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.texto,
  },
  descricao: {
    fontSize: 13,
    color: colors.textoMuted,
    marginTop: 4,
    marginBottom: 12,
  },
  caixas: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  caixa: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: colors.primaria,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  digito: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primaria,
  },
  digitoVazio: {
    color: colors.placeholder,
  },
  entrada: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
  },
  aviso: {
    marginTop: 12,
  },
});