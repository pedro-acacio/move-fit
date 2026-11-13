import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarraProgresso } from "../../components/BarraProgresso/BarraProgresso";
import { Botao } from "../../components/Botao/Botao";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { CartaoExercicioFeito } from "../../components/CartaoExercicioFeito/CartaoExercicioFeito";
import { Dica } from "../../components/Dica/Dica";
import { buscarExercicioPorId } from "../../services/exerciciosService";
import { buscarTreino } from "../../services/treinosService";
import global from "../../styles/global";
import styles from "./DetalhesDoTreino.styles";
import { registrarConclusao } from "../../services/historicoService";

// Detalhes do treino do aluno (RF15, RF16, RF16.1): marca cada exercício e finaliza o treino.
// TODO: guardar o treino em cache offline (RNF06) para consultar sem internet.
export default function DetalhesDoTreino() {
  const { id } = useLocalSearchParams();
  // undefined = ainda carregando; null = não existe (ou sem conexão).
  const [treino, setTreino] = useState(undefined);
  const [feitos, setFeitos] = useState([]);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState(null);

  // Carrega o treino pelo id da rota; "ativo" evita gravar estado depois de sair da tela.
  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        const resultado = await buscarTreino(id);
        if (ativo) setTreino(resultado);
      } catch {
        if (ativo) setTreino(null);
      }
    }

    carregar();
    return () => {
      ativo = false;
    };
  }, [id]);

  if (treino === undefined) {
    return (
      <SafeAreaView style={global.tela} edges={["top", "bottom"]}>
        <Cabecalho titulo="Treino" />
        <Text style={styles.vazio}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  if (!treino) {
    return (
      <SafeAreaView style={global.tela} edges={["top", "bottom"]}>
        <Cabecalho titulo="Treino" />
        <Text style={styles.vazio}>Treino não encontrado.</Text>
      </SafeAreaView>
    );
  }

  const [titulo, subtitulo] = treino.nome.split(" · ");
  const total = treino.exercicios.length;

  function alternarFeito(exercicioId) {
    setFeitos((atual) =>
      atual.includes(exercicioId)
        ? atual.filter((item) => item !== exercicioId)
        : [...atual, exercicioId]
    );
  }

  // Grava a conclusão no histórico (RF16.1) e volta para a Home avisando.
  async function concluirTreino() {
    setErro(null);
    setSalvando(true);
    try {
      await registrarConclusao(treino);
      router.dismissTo({ pathname: "/aluno", params: { concluido: treino.nome } });
    } catch {
      setErro("Não foi possível registrar o treino. Verifique a internet e tente de novo.");
      setSalvando(false);
    }
  }

  return (
    <SafeAreaView style={global.tela} edges={["top", "bottom"]}>
      <Cabecalho titulo={titulo} />

      <ScrollView
        style={styles.rolagem}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {subtitulo && <Text style={styles.subtitulo}>{subtitulo}</Text>}
        <Text style={styles.professor}>Enviado por Prof. {treino.professorNome}</Text>

        <View style={styles.progresso}>
          <Text style={styles.progressoTexto}>
            {feitos.length} de {total} exercícios feitos
          </Text>
          <BarraProgresso atual={feitos.length} total={total} />
        </View>

        {treino.exercicios.map((item) => {
          const exercicio = buscarExercicioPorId(item.id);
          const nome = exercicio?.nomePt ?? item.id;

          return (
            <CartaoExercicioFeito
              key={item.id}
              nome={nome}
              detalhe={`${item.series} séries · ${item.repeticoes} repetições`}
              feito={feitos.includes(item.id)}
              aoMarcar={() => alternarFeito(item.id)}
              onPress={() =>
                router.push({
                  pathname: "/aluno/exercicio/[id]",
                  params: { id: item.id, series: item.series, repeticoes: item.repeticoes, treino: id },
                })
              }
            />
          );
        })}

        <Dica texto="Toque no quadrado para marcar o exercício como feito." />
      </ScrollView>

      <View style={styles.rodape}>
        {erro && <Dica texto={erro} />}
        <Botao
          texto={salvando ? "Salvando..." : "Marcar treino concluído"}
          onPress={salvando ? undefined : concluirTreino}
        />
        <Botao
          texto="Tirar dúvida com a IA"
          secundario
          onPress={() => router.push({ pathname: "/aluno/assistente", params: { treino: id } })}
        />
      </View>
    </SafeAreaView>
  );
}
