import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  cartao: {
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  linha: {
    flexDirection: "row",
    alignItems: "center",
  },
  caixaSelecao: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.borda,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  caixaSelecaoAtiva: {
    backgroundColor: colors.primaria,
    borderColor: colors.primaria,
  },
  marca: {
    color: colors.fundo,
    fontSize: 14,
    fontWeight: "700",
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.texto,
  },
  grupo: {
    fontSize: 13,
    color: colors.textoMuted,
    marginTop: 2,
  },
  seta: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  setaTexto: {
    fontSize: 20,
    color: colors.textoMuted,
    transform: [{ rotate: "0deg" }],
  },
  setaTextoAberta: {
    transform: [{ rotate: "90deg" }],
  },
  previa: {
    marginTop: 12,
  },
  descricao: {
    fontSize: 12,
    color: colors.textoMuted,
    marginTop: 6,
  },
  linhaCampos: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  coluna: {
    flex: 1,
  },
});
