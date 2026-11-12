import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Botao } from "../../components/Botao/Botao";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { Campo } from "../../components/Campo/Campo";
import { CartaoItemTreino } from "../../components/CartaoItemTreino/CartaoItemTreino";
import { Dica } from "../../components/Dica/Dica";
import { SeletorOpcoes } from "../../components/SeletorOpcoes/SeletorOpcoes";
import { useUsuarioLogado } from "../../context/UsuarioLogado";
import { observarAlunosDoProfessor } from "../../services/vinculoService";
import { salvarTreino } from "../../services/treinosService";
import global from "../../styles/global";
import styles from "./CadastroTreino.styles";

// Cadastro de treino (RF06, RF06.2, RF06.4): a mesma tela serve para criar e para editar.
// Recebe "treino" (editar), "alunoId" (vindo dos Detalhes do aluno)
// e "exercicios" (vindo de Selecionar exercícios).
export default function CadastroTreino() {
  const params = useLocalSearchParams();
  // Guardado uma vez só: os parâmetros mudam quando voltamos de Selecionar exercícios.
  const [original] = useState(() => (params.treino ? JSON.parse(params.treino) : null));

  const [nome, setNome] = useState(original?.nome ?? "");
  const [alunoId, setAlunoId] = useState(original?.alunoId ?? params.alunoId ?? null);
  const [exercicios, setExercicios] = useState(original?.exercicios ?? []);
  const [erro, setErro] = useState(null);
  const [ultimaSelecao, setUltimaSelecao] = useState(null);
  const [alunosVinculados, setAlunosVinculados] = useState([]);
  const { usuario } = useUsuarioLogado();

  // Só alunos já vinculados podem receber treino (RF06.4).
  useEffect(() => {
    return observarAlunosDoProfessor((alunos) =>
      setAlunosVinculados(alunos.map((aluno) => ({ chave: aluno.id, rotulo: aluno.nome })))
    );
  }, []);

  // Junta os exercícios que voltaram de Selecionar exercícios, sem repetir.
  if (params.exercicios && params.exercicios !== ultimaSelecao) {
    const novos = JSON.parse(params.exercicios);
    setUltimaSelecao(params.exercicios);
    setExercicios([
      ...exercicios,
      ...novos.filter((novo) => !exercicios.some((item) => item.id === novo.id)),
    ]);
  }

  function remover(id) {
    setExercicios(exercicios.filter((item) => item.id !== id));
  }

  // Salva no Firebase (RF06.5) e volta para a lista, que se atualiza sozinha pelo observador.
  async function salvar(enviar) {
    if (!nome.trim() || exercicios.length === 0) {
      setErro("Informe o nome e adicione pelo menos um exercício.");
      return;
    }
    if (enviar && !alunoId) {
      setErro("Escolha um aluno para enviar o treino.");
      return;
    }

    // Grava o que está na tela. "Salvar e enviar" só exige que haja aluno escolhido.
    setErro(null);
    try {
      await salvarTreino({
        id: original?.id,
        nome: nome.trim(),
        alunoId,
        alunoNome:
          alunosVinculados.find((aluno) => aluno.chave === alunoId)?.rotulo ??
          original?.alunoNome ??
          null,
        exercicios,
        professorNome: usuario?.nome,
      });
    } catch {
      setErro("Não foi possível salvar o treino. Tente de novo.");
      return;
    }

    router.dismissTo({
      pathname: "/professor/treinos",
      params: { aviso: enviar ? "Treino salvo e enviado ao aluno." : "Treino salvo." },
    });
  }

  return (
    <SafeAreaView style={global.tela} edges={["top", "bottom"]}>
      <Cabecalho titulo={original ? "Editar treino" : "Cadastrar treino"} />

      <ScrollView
        style={styles.rolagem}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Campo
          rotulo="Nome do treino"
          placeholder="Ex.: Treino A · Peito e Tríceps"
          valor={nome}
          aoMudarTexto={setNome}
        />

        <Text style={styles.rotulo}>Selecionar aluno</Text>
        {alunosVinculados.length === 0 ? (
          <Text style={styles.vazio}>Nenhum aluno vinculado ainda.</Text>
        ) : (
          <SeletorOpcoes opcoes={alunosVinculados} valor={alunoId} aoMudar={setAlunoId} />
        )}

        <Text style={styles.secao}>Exercícios do treino ({exercicios.length})</Text>
        {exercicios.map((item) => (
          <CartaoItemTreino
            key={item.id}
            nome={item.nome}
            detalhe={`${item.series} séries · ${item.repeticoes} repetições`}
            aoRemover={() => remover(item.id)}
          />
        ))}

        <Botao
          texto="+ Adicionar exercício"
          secundario
          onPress={() => router.push("/professor/treino/selecionar-exercicios")}
        />

        {erro && (
          <View style={styles.erro}>
            <Dica texto={erro} />
          </View>
        )}
      </ScrollView>

      <View style={styles.rodape}>
        <Botao texto="Salvar treino" secundario onPress={() => salvar(false)} />
        <Botao texto="Salvar e enviar ao aluno" onPress={() => salvar(true)} />
      </View>
    </SafeAreaView>
  );
}
