import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Botao } from "../../components/Botao/Botao";
import { CartaoExercicio } from "../../components/CartaoExercicio/CartaoExercicio";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { descricaoCurta, listarTodosExercicios } from "../../services/exerciciosService";
import { imagensDoExercicio } from "../../services/midiaExercicio";
import { colors } from "../../styles/theme";
import global from "../../styles/global";
import styles from "./SelecionarExercicios.styles";

export default function SelecionarExercicios() {
  const [pesquisa, setPesquisa] = useState("");
  const [selecionados, setSelecionados] = useState({});
  const [expandidos, setExpandidos] = useState([]);

  const exercicios = useMemo(
    () =>
      listarTodosExercicios().map((exercicio) => ({
        ...exercicio,
        descricao: descricaoCurta(exercicio),
        imagens: imagensDoExercicio(exercicio),
      })),
    []
  );

  const exerciciosFiltrados = useMemo(() => {
    const termo = pesquisa.trim().toLowerCase();
    if (!termo) return exercicios;
    return exercicios.filter((exercicio) => exercicio.nome.toLowerCase().includes(termo));
  }, [pesquisa, exercicios]);

  function alternarSelecao(id) {
    setSelecionados((atual) => {
      const novo = { ...atual };
      if (novo[id]) {
        delete novo[id];
      } else {
        novo[id] = { series: 3, repeticoes: 12 };
      }
      return novo;
    });
  }

  function alternarExpandido(id) {
    setExpandidos((atual) =>
      atual.includes(id) ? atual.filter((itemId) => itemId !== id) : [...atual, id]
    );
  }

  function mudarSerieRepeticao(id, campo, valor) {
    setSelecionados((atual) => ({
      ...atual,
      [id]: { ...atual[id], [campo]: valor },
    }));
  }

 
  function adicionarAoTreino() {
    const escolhidos = exercicios
      .filter((exercicio) => selecionados[exercicio.id])
      .map((exercicio) => ({
        id: exercicio.id,
        nome: exercicio.nome,
        ...selecionados[exercicio.id],
      }));

    router.dismissTo({
      pathname: "/professor/treino/cadastro",
      params: { exercicios: JSON.stringify(escolhidos) },
    });
  }

  const quantidade = Object.keys(selecionados).length;

  return (
    <SafeAreaView style={global.tela} edges={["top", "bottom"]}>
      <Cabecalho titulo="Selecionar exercícios" />

      <TextInput
        style={styles.busca}
        placeholder="Pesquisar exercício..."
        placeholderTextColor={colors.placeholder}
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      <FlatList
        data={exerciciosFiltrados}
        keyExtractor={(exercicio) => exercicio.id}
        style={styles.lista}
        contentContainerStyle={styles.listaConteudo}
        renderItem={({ item }) => (
          <CartaoExercicio
            exercicio={item}
            selecionado={Boolean(selecionados[item.id])}
            expandido={expandidos.includes(item.id)}
            aoAlternarSelecao={() => alternarSelecao(item.id)}
            aoAlternarExpandido={() => alternarExpandido(item.id)}
            series={selecionados[item.id]?.series ?? 0}
            repeticoes={selecionados[item.id]?.repeticoes ?? 0}
            aoMudarSeries={(valor) => mudarSerieRepeticao(item.id, "series", valor)}
            aoMudarRepeticoes={(valor) => mudarSerieRepeticao(item.id, "repeticoes", valor)}
          />
        )}
      />

      <View style={styles.dica}>
        <Text style={styles.dicaTexto}>
          Para cada exercício marcado, o professor informa séries e repetições.
        </Text>
      </View>

      {quantidade > 0 && (
        <View style={styles.acao}>
          <Botao texto={`Adicionar ao treino (${quantidade})`} onPress={adicionarAoTreino} />
        </View>
      )}
    </SafeAreaView>
  );
}
