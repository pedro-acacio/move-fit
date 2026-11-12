import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Botao } from "../Botao/Botao";
import { Dica } from "../Dica/Dica";
import { useCorDaArea } from "../../context/CorDaArea";
import { useUsuarioLogado } from "../../context/UsuarioLogado";
import { vincularPorCodigo } from "../../services/vinculoService";
import styles from "./VincularCodigo.styles";

const posicoes = [0, 1, 2, 3];

// Cartão para vincular aluno e professor pelo código de 4 dígitos (RF11).
export function VincularCodigo({ titulo, descricao }) {
  const [codigo, setCodigo] = useState("");
  const [aviso, setAviso] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const cor = useCorDaArea();
  const { usuario } = useUsuarioLogado();

  function mudarCodigo(texto) {
    setCodigo(texto.replace(/\D/g, ""));
    setAviso(null);
  }

  async function vincular() {
    if (codigo.length < 4) {
      setAviso("Digite os 4 dígitos do código.");
      return;
    }

    setEnviando(true);
    try {
      await vincularPorCodigo(codigo, usuario.perfil, usuario.nome);
      setAviso("Vinculado com sucesso!");
      setCodigo("");
    } catch (erro) {
      setAviso(erro.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <View style={styles.cartao}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.descricao}>{descricao}</Text>

      <View style={styles.caixas}>
        {posicoes.map((posicao) => (
          <View key={posicao} style={[styles.caixa, { borderColor: cor }]}>
            <Text style={[styles.digito, { color: cor }, !codigo[posicao] && styles.digitoVazio]}>
              {codigo[posicao] || "0"}
            </Text>
          </View>
        ))}

        <TextInput
          style={styles.entrada}
          value={codigo}
          onChangeText={mudarCodigo}
          keyboardType="number-pad"
          maxLength={4}
        />
      </View>

      <Botao texto={enviando ? "Vinculando..." : "Vincular"} onPress={vincular} />
      {aviso && (
        <View style={styles.aviso}>
          <Dica texto={aviso} />
        </View>
      )}
    </View>
  );
}
