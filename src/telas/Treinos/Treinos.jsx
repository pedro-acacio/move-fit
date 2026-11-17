import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BotaoFlutuante } from "../../components/BotaoFlutuante/BotaoFlutuante";
import { Campo } from "../../components/Campo/Campo";
import { CartaoComAcoes } from "../../components/CartaoComAcoes/CartaoComAcoes";
import { ConfirmarExclusao } from "../../components/ConfirmarExclusao/ConfirmarExclusao";
import { Dica } from "../../components/Dica/Dica";
import {
  duplicarTreino,
  excluirTreino,
  observarTreinosDoProfessor,
} from "../../services/treinosService";
import global from "../../styles/global";
import styles from "./Treinos.styles";


export default function Treinos() {
  const { aviso } = useLocalSearchParams();
  const [treinos, setTreinos] = useState([]);
  const [busca, setBusca] = useState("");
  const [paraExcluir, setParaExcluir] = useState(null);

  useEffect(() => observarTreinosDoProfessor(setTreinos), []);

  const termo = busca.trim().toLowerCase();
  const encontrados = treinos.filter((treino) => treino.nome.toLowerCase().includes(termo));



  function confirmarExclusao() {
    if (!paraExcluir) return;
    excluirTreino(paraExcluir.id);
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
            descricao={`Aluno: ${item.alunoNome ?? "sem aluno"} · ${item.exercicios.length} exercícios`}
            aoEditar={() =>
              router.push({
                pathname: "/professor/treino/cadastro",
                params: { treino: JSON.stringify(item) },
              })
            }
            aoDuplicar={() => duplicarTreino(item)}
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
