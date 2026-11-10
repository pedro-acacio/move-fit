import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: colors.dicaFundo,
  },
  imagem: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  indisponivel: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: colors.borda,
    alignItems: "center",
    justifyContent: "center",
  },
  indisponivelTexto: {
    fontSize: 13,
    color: colors.textoMuted,
  },
});
