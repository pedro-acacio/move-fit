import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { Botao } from "../../components/Botao/Botao";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { DemonstracaoExercicio } from "../../components/DemonstracaoExercicio/DemonstracaoExercicio";
import { buscarExercicioPorId } from "../../services/exerciciosService";
import { imagensDoExercicio } from "../../services/midiaExercicio";
import global from "../../styles/global";
import styles from "./DetalhesDoExercicio.styles";

export default function DetalhesDoExercicio() {
 
  const { id, series, repeticoes, treino } = useLocalSearchParams();
  const exercicio = buscarExercicioPorId(id);

  if (!exercicio) {
    return (
      <ScrollView style={global.tela} contentContainerStyle={styles.conteudo}>
        <Cabecalho titulo="Exercício" />
        <Text style={styles.aviso}>Exercício não encontrado.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={global.tela} contentContainerStyle={styles.conteudo}>
      <Cabecalho titulo={exercicio.nomePt} />

      <DemonstracaoExercicio
        key={exercicio.id}
        imagens={imagensDoExercicio(exercicio)}
        textoAlternativo={exercicio.nomePt}
      />

      <Text style={styles.grupo}>{exercicio.grupo}</Text>

      {series && (
        <View style={styles.numeros}>
          <View style={styles.numero}>
            <Text style={styles.numeroRotulo}>Séries</Text>
            <Text style={styles.numeroValor}>{series}</Text>
          </View>
          <View style={styles.numero}>
            <Text style={styles.numeroRotulo}>Repetições</Text>
            <Text style={styles.numeroValor}>{repeticoes}</Text>
          </View>
        </View>
      )}

      <View style={styles.linhaInfo}>
        <Text style={styles.infoTexto}>Equipamento: {exercicio.equipamento}</Text>
        <Text style={styles.infoTexto}>Dificuldade: {exercicio.dificuldade}</Text>
      </View>

      <Text style={styles.subtitulo}>Como executar</Text>
      {exercicio.instrucoes.map((passo, indice) => (
        <Text key={indice} style={styles.passo}>
          {indice + 1}. {passo}
        </Text>
      ))}

      <View style={styles.botoes}>
        <Botao
          texto="Tirar dúvida com a IA"
          onPress={() => router.push({ pathname: "/aluno/assistente", params: { treino } })}
        />
        {treino && <Botao texto="Voltar ao treino" secundario onPress={() => router.back()} />}
      </View>
    </ScrollView>
  );
}
