import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "center",
  },
  anel: {
    width: 140,
    height: 140,
  },
  centro: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  numero: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.texto,
  },
  rotulo: {
    fontSize: 13,
    color: colors.textoMuted,
    marginTop: 10,
    textAlign: "center",
  },
});
