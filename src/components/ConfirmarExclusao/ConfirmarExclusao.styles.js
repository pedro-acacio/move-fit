import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: colors.sombra,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  caixa: {
    backgroundColor: colors.fundo,
    borderRadius: 16,
    padding: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.texto,
  },
  mensagem: {
    fontSize: 15,
    color: colors.textoMuted,
    marginTop: 8,
  },
  botoes: {
    gap: 12,
    marginTop: 20,
  },
});