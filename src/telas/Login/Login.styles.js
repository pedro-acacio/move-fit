import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  conteudo: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 40,
  },
  topo: {
    alignItems: "center",
    marginBottom: 32,
  },
  marca: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.texto,
  },
  slogan: {
    fontSize: 15,
    color: colors.textoMuted,
    marginTop: 6,
    textAlign: "center",
  },
  esqueceu: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  link: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primaria,
  },
  cadastro: {
    marginTop: 24,
    alignItems: "center",
  },
  textoCadastro: {
    fontSize: 15,
    color: colors.textoMuted,
  },
});
