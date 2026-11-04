import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartaoHistorico } from "../../components/CartaoHistorico/CartaoHistorico";
import { CartaoMeta } from "../../components/CartaoMeta/CartaoMeta";
import global from "../../styles/global";
import dados from "./dados.json";
import styles from "./Historico.styles";

// Histórico do aluno (RF18): progresso da semana e lista dos treinos concluídos.
// TODO: trocar o dados.json pelo histórico do aluno logado vindo do Firebase.
export default function Historico() {
  const { meta, concluidosNaSemana, treinosConcluidos } = dados;

  return (
    <SafeAreaView style={global.tela} edges={["top"]}>
      <Text style={styles.titulo}>Histórico</Text>

      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        <CartaoMeta titulo="Esta semana" concluidos={concluidosNaSemana} meta={meta} />

        <Text style={styles.secao}>Treinos concluídos</Text>

        {treinosConcluidos.length === 0 ? (
          <Text style={styles.vazio}>Nenhum treino concluído ainda.</Text>
        ) : (
          treinosConcluidos.map((treino) => (
            <CartaoHistorico
              key={treino.id}
              titulo={treino.nome}
              detalhe={`${treino.dia} · ${treino.exercicios} exercícios`}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}