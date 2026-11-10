import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  cartao: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
  },
  caixa: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.borda,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  caixaFeita: {
    backgroundColor: colors.primaria,
    borderColor: colors.primaria,
  },
  marca: {
    color: colors.fundo,
    fontSize: 16,
    fontWeight: "700",
  },
  info: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textos: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.texto,
  },
  nomeFeito: {
    color: colors.textoMuted,
    textDecorationLine: "line-through",
  },
  detalhe: {
    fontSize: 14,
    color: colors.textoMuted,
    marginTop: 4,
  },
  seta: {
    fontSize: 24,
    color: colors.textoMuted,
    marginLeft: 12,
  },
});
