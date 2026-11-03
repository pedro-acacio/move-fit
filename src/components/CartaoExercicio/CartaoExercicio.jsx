import { Pressable, Text, View } from "react-native";
import { SeletorNumero } from "../SeletorNumero/SeletorNumero";
import styles from "./CartaoExercicio.styles";

export function CartaoExercicio({
  exercicio,
  selecionado,
  expandido,
  aoAlternarSelecao,
  aoAlternarExpandido,
  series,
  repeticoes,
  aoMudarSeries,
  aoMudarRepeticoes,
}) {
  return (
    <View style={styles.cartao}>
      <View style={styles.linha}>
        <Pressable
          style={[styles.caixaSelecao, selecionado && styles.caixaSelecaoAtiva]}
          onPress={aoAlternarSelecao}
        >
          {selecionado && <Text style={styles.marca}>✓</Text>}
        </Pressable>

        <Pressable style={styles.info} onPress={aoAlternarSelecao}>
          <Text style={styles.nome}>{exercicio.nome}</Text>
          <Text style={styles.grupo}>{exercicio.grupo}</Text>
        </Pressable>

        <Pressable style={styles.seta} onPress={aoAlternarExpandido} hitSlop={12}>
          <Text style={[styles.setaTexto, expandido && styles.setaTextoAberta]}>›</Text>
        </Pressable>
      </View>

      {expandido && (
        <View style={styles.previa}>
          <View style={styles.imagem}>
            <Text style={styles.imagemEmoji}>🏋️</Text>
            <Text style={styles.imagemTexto}>Imagem em breve</Text>
          </View>
          <Text style={styles.descricao}>{exercicio.descricao}</Text>
        </View>
      )}

      {selecionado && (
        <View style={styles.linhaCampos}>
          <View style={styles.coluna}>
            <SeletorNumero rotulo="Séries" valor={series} aoMudar={aoMudarSeries} minimo={0} maximo={20} />
          </View>
          <View style={styles.coluna}>
            <SeletorNumero rotulo="Repetições" valor={repeticoes} aoMudar={aoMudarRepeticoes} minimo={0} maximo={50} />
          </View>
        </View>
      )}
    </View>
  );
}
