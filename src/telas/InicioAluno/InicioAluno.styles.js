import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  topo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  saudacao: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.texto,
  },
  foto: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.borda,
    alignItems: "center",
    justifyContent: "center",
  },
  fotoTexto: {
    fontSize: 22,
  },
  anel: {
    marginBottom: 20,
  },
  conteudo: {
    paddingBottom: 100, // espaço para o botão flutuante não cobrir a dica
  },
  secao: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.texto,
    marginTop: 24,
    marginBottom: 12,
  },
  vazio: {
    fontSize: 15,
    color: colors.textoMuted,
    marginBottom: 16,
  },
});
