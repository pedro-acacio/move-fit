import { useMemo, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { CartaoExercicio } from "../../components/CartaoExercicio/CartaoExercicio";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { colors } from "../../styles/theme";
import global from "../../styles/global";
import exercicios from "./exercicios.json";
import styles from "./SelecionarExercicios.styles";

export default function SelecionarExercicios() {
  const [pesquisa, setPesquisa] = useState("");
  const [selecionados, setSelecionados] = useState({});
  const [expandidos, setExpandidos] = useState([]);

  const exerciciosFiltrados = useMemo(() => {
    const termo = pesquisa.trim().toLowerCase();
    if (!termo) return exercicios;
    return exercicios.filter((exercicio) => exercicio.nome.toLowerCase().includes(termo));
  }, [pesquisa]);

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

  return (
    <View style={global.tela}>
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
    </View>
  );
}
