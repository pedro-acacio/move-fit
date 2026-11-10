import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export default StyleSheet.create({
  conteudo: {
    paddingBottom: 40,
  },
  grupo: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primaria,
    marginTop: 12,
  },
  numeros: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  numero: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  numeroRotulo: {
    fontSize: 14,
    color: colors.textoMuted,
  },
  numeroValor: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.texto,
    marginTop: 4,
  },
  botoes: {
    gap: 12,
    marginTop: 24,
  },
  linhaInfo: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  infoTexto: {
    fontSize: 13,
    color: colors.textoMuted,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.texto,
    marginBottom: 8,
  },
  passo: {
    fontSize: 14,
    color: colors.texto,
    marginBottom: 8,
    lineHeight: 20,
  },
  aviso: {
    fontSize: 15,
    color: colors.textoMuted,
    marginTop: 16,
  },
});
