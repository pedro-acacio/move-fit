import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BotaoFlutuante } from "../../components/BotaoFlutuante/BotaoFlutuante";
import { Campo } from "../../components/Campo/Campo";
import { CartaoComAcoes } from "../../components/CartaoComAcoes/CartaoComAcoes";
import { ConfirmarExclusao } from "../../components/ConfirmarExclusao/ConfirmarExclusao";
import global from "../../styles/global";
import listaInicial from "./exercicios.json";
import styles from "./Exercicios.styles";

// Aba Exercícios do professor (RF07): lista, busca, editar e excluir exercícios.
// TODO: trocar o exercicios.json pelos exercícios vindos do Firebase.
export default function Exercicios() {
  const [exercicios, setExercicios] = useState(listaInicial);
  const [busca, setBusca] = useState("");
  const [paraExcluir, setParaExcluir] = useState(null);
  const { salvo } = useLocalSearchParams();

  const [ultimoSalvo, setUltimoSalvo] = useState(null);

  // O Cadastro de exercício volta para cá com o exercício salvo: troca o antigo ou adiciona o novo.
  // Comparar com o último recebido garante que cada exercício salvo entra uma vez só.
  if (salvo && salvo !== ultimoSalvo) {
    const exercicio = JSON.parse(salvo);
    setUltimoSalvo(salvo);
    setExercicios(
      exercicios.some((item) => item.id === exercicio.id)
        ? exercicios.map((item) => (item.id === exercicio.id ? exercicio : item))
        : [exercicio, ...exercicios]
    );
  }

  const termo = busca.trim().toLowerCase();
  const encontrados = exercicios.filter((exercicio) =>
    exercicio.nome.toLowerCase().includes(termo)
  );

  function confirmarExclusao() {
    // TODO: quando o Firebase estiver pronto, excluir o exercício também no banco.
    setExercicios(exercicios.filter((exercicio) => exercicio.id !== paraExcluir.id));
    setParaExcluir(null);
  }

  return (
    <SafeAreaView style={global.tela} edges={["top"]}>
      <Text style={styles.titulo}>Exercícios</Text>

      <Campo placeholder="Buscar exercício pelo nome" valor={busca} aoMudarTexto={setBusca} />

      <FlatList
        data={encontrados}
        keyExtractor={(exercicio) => exercicio.id}
        contentContainerStyle={styles.lista}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum exercício encontrado.</Text>}
        renderItem={({ item }) => (
          <CartaoComAcoes
            titulo={item.nome}
            descricao={item.descricao}
            aoEditar={() =>
              router.push({ pathname: "/professor/exercicio/cadastro", params: { id: item.id, nome: item.nome, descricao: item.descricao, grupo: item.grupo } })
            }
            aoExcluir={() => setParaExcluir(item)}
          />
        )}
      />

      <BotaoFlutuante
        texto="+ Novo exercício"
        onPress={() => router.push("/professor/exercicio/cadastro")}
      />

      <ConfirmarExclusao
        visivel={paraExcluir !== null}
        titulo="Excluir exercício?"
        aoConfirmar={confirmarExclusao}
        aoCancelar={() => setParaExcluir(null)}
      />
    </SafeAreaView>
  );
}