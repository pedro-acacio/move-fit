import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  topo: {
    paddingVertical: 16,
  },
  saudacao: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.texto,
  },
  conteudo: {
    paddingBottom: 24,
  },
  numeros: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  anel: {
    marginBottom: 20,
  },
  linhaSecao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 12,
  },
  secao: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.texto,
  },
  link: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primaria,
    textDecorationLine: "underline",
  },
  vazio: {
    fontSize: 15,
    color: colors.textoMuted,
  },
});
