import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BotaoFlutuante } from "../../components/BotaoFlutuante/BotaoFlutuante";
import { Campo } from "../../components/Campo/Campo";
import { CartaoComAcoes } from "../../components/CartaoComAcoes/CartaoComAcoes";
import { ConfirmarExclusao } from "../../components/ConfirmarExclusao/ConfirmarExclusao";
import { excluirExercicio, observarExerciciosDoProfessor } from "../../services/exerciciosProfessorService";
import global from "../../styles/global";
import styles from "./Exercicios.styles";

// Aba Exercícios do professor (RF07): lista, busca, editar e excluir exercícios.
export default function Exercicios() {
  const [exercicios, setExercicios] = useState([]);
  const [busca, setBusca] = useState("");
  const [paraExcluir, setParaExcluir] = useState(null);

  useEffect(() => observarExerciciosDoProfessor(setExercicios), []);

  const termo = busca.trim().toLowerCase();
  const encontrados = exercicios.filter((exercicio) =>
    exercicio.nome.toLowerCase().includes(termo)
  );

  // O aviso some com animação: um segundo toque em "Excluir" nesse meio-tempo
  // chegaria aqui com paraExcluir já null. Por isso a conferência antes.
  function confirmarExclusao() {
    if (!paraExcluir) return;
    excluirExercicio(paraExcluir.id);
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
