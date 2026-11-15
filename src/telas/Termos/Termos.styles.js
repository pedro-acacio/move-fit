import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  conteudo: {
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.texto,
    marginTop: 8,
  },
  atualizado: {
    fontSize: 13,
    color: colors.textoMuted,
    marginTop: 4,
    marginBottom: 20,
  },
  secao: {
    marginBottom: 20,
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.texto,
    marginBottom: 6,
  },
  texto: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.texto,
    marginBottom: 8,
  },
});
