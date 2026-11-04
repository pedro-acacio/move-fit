import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.texto,
    paddingVertical: 16,
  },
  conteudo: {
    alignItems: "center",
    paddingBottom: 40,
  },
  icone: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.borda,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  iconeTexto: {
    fontSize: 40,
  },
  cartaoCodigo: {
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  rotuloCodigo: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.texto,
  },
  codigo: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 6,
    color: colors.primaria,
    marginVertical: 8,
  },
  avisoCodigo: {
    fontSize: 14,
    color: colors.textoMuted,
    textAlign: "center",
  },
});
