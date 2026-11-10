import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BotaoFlutuante } from "../../components/BotaoFlutuante/BotaoFlutuante";
import { Campo } from "../../components/Campo/Campo";
import { CartaoComAcoes } from "../../components/CartaoComAcoes/CartaoComAcoes";
import { ConfirmarExclusao } from "../../components/ConfirmarExclusao/ConfirmarExclusao";
import { Dica } from "../../components/Dica/Dica";
import global from "../../styles/global";
import alunos from "../Alunos/dados.json";
import listaInicial from "./dados.json";
import styles from "./Treinos.styles";

function nomeDoAluno(alunoId) {
  return alunos.alunos.find((aluno) => aluno.id === alunoId)?.nome ?? "sem aluno";
}

// Aba Treinos do professor (RF06.1, RF06.3, RF06.6, RF09): busca, editar, duplicar e excluir.
// TODO: trocar o dados.json pelos treinos vindos do Firebase.
export default function Treinos() {
  const { salvo, aviso } = useLocalSearchParams();
  const [treinos, setTreinos] = useState(listaInicial.treinos);
  const [busca, setBusca] = useState("");
  const [paraExcluir, setParaExcluir] = useState(null);

  const [ultimoSalvo, setUltimoSalvo] = useState(null);
  const [copias, setCopias] = useState(0); // conta as cópias para cada uma ter um id diferente

  // O Cadastro de treino volta para cá com o treino salvo: troca o antigo ou adiciona o novo.
  // Comparar com o último recebido garante que cada treino salvo entra uma vez só.
  if (salvo && salvo !== ultimoSalvo) {
    const treino = JSON.parse(salvo);
    setUltimoSalvo(salvo);
    setTreinos(
      treinos.some((item) => item.id === treino.id)
        ? treinos.map((item) => (item.id === treino.id ? treino : item))
        : [treino, ...treinos]
    );
  }

  const termo = busca.trim().toLowerCase();
  const encontrados = treinos.filter((treino) => treino.nome.toLowerCase().includes(termo));

  function duplicar(treino) {
    const copia = { ...treino, id: `copia-${copias + 1}`, nome: `${treino.nome} (cópia)` };
    setCopias(copias + 1);
    setTreinos([copia, ...treinos]);
  }

  function confirmarExclusao() {
    // TODO: quando o Firebase estiver pronto, excluir o treino também no banco.
    setTreinos(treinos.filter((treino) => treino.id !== paraExcluir.id));
    setParaExcluir(null);
  }

  return (
    <SafeAreaView style={global.tela} edges={["top"]}>
      <Text style={styles.titulo}>Treinos</Text>

      <Campo placeholder="Buscar treino pelo nome" valor={busca} aoMudarTexto={setBusca} />

      {aviso && (
        <View style={styles.aviso}>
          <Dica texto={aviso} />
        </View>
      )}

      <FlatList
        data={encontrados}
        keyExtractor={(treino) => treino.id}
        contentContainerStyle={styles.lista}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum treino encontrado.</Text>}
        renderItem={({ item }) => (
          <CartaoComAcoes
            titulo={item.nome}
            descricao={`Aluno: ${nomeDoAluno(item.alunoId)} · ${item.exercicios.length} exercícios`}
            aoEditar={() =>
              router.push({
                pathname: "/professor/treino/cadastro",
                params: { treino: JSON.stringify(item) },
              })
            }
            aoDuplicar={() => duplicar(item)}
            aoExcluir={() => setParaExcluir(item)}
          />
        )}
      />

      <BotaoFlutuante
        texto="+ Novo treino"
        onPress={() => router.push("/professor/treino/cadastro")}
      />

      <ConfirmarExclusao
        visivel={paraExcluir !== null}
        titulo="Excluir treino?"
        aoConfirmar={confirmarExclusao}
        aoCancelar={() => setParaExcluir(null)}
      />
    </SafeAreaView>
  );
}
