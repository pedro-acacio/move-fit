import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { DemonstracaoExercicio } from "../../components/DemonstracaoExercicio/DemonstracaoExercicio";
import { buscarExercicioPorId } from "../../services/exerciciosService";
import { imagensDoExercicio } from "../../services/midiaExercicio";
import global from "../../styles/global";
import styles from "./DetalhesDoExercicio.styles";

export default function DetalhesDoExercicio() {
  const { id } = useLocalSearchParams();
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
    </ScrollView>
  );
}
