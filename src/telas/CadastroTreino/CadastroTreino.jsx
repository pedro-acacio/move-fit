import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Botao } from "../../components/Botao/Botao";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { Campo } from "../../components/Campo/Campo";
import { CartaoItemTreino } from "../../components/CartaoItemTreino/CartaoItemTreino";
import { Dica } from "../../components/Dica/Dica";
import { SeletorOpcoes } from "../../components/SeletorOpcoes/SeletorOpcoes";
import global from "../../styles/global";
import alunos from "../Alunos/dados.json";
import styles from "./CadastroTreino.styles";

// Só alunos já vinculados podem receber treino (RF06.4).
const alunosVinculados = alunos.alunos
  .filter((aluno) => aluno.status === "ativo")
  .map((aluno) => ({ chave: aluno.id, rotulo: aluno.nome }));

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

  // TODO: salvar o treino no Firebase (RF06.5) e, ao enviar, ligar ao perfil do aluno.
  function salvar(enviar) {
    if (!nome.trim() || exercicios.length === 0) {
      setErro("Informe o nome e adicione pelo menos um exercício.");
      return;
    }
    if (enviar && !alunoId) {
      setErro("Escolha um aluno para enviar o treino.");
      return;
    }

    const treino = { id: original?.id ?? String(Date.now()), nome: nome.trim(), alunoId, exercicios };
    router.dismissTo({
      pathname: "/professor/treinos",
      params: {
        salvo: JSON.stringify(treino),
        aviso: enviar ? "Treino salvo e enviado ao aluno." : "Treino salvo.",
      },
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
