import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Botao } from "../../components/Botao/Botao";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { CartaoMeta } from "../../components/CartaoMeta/CartaoMeta";
import { CartaoPessoa } from "../../components/CartaoPessoa/CartaoPessoa";
import { LinhaTreino } from "../../components/LinhaTreino/LinhaTreino";
import {
  contarNaSemana,
  descreverDia,
  META_SEMANAL,
  observarHistoricoDoProfessor,
} from "../../services/historicoService";
import { observarTreinosDoProfessor } from "../../services/treinosService";
import { observarAlunosDoProfessor } from "../../services/vinculoService";
import global from "../../styles/global";
import styles from "./DetalhesAluno.styles";



export default function DetalhesAluno() {
  const { id } = useLocalSearchParams();

  const [alunos, setAlunos] = useState(null);
  const [treinos, setTreinos] = useState([]);
  const [historico, setHistorico] = useState([]);

  useEffect(() => observarAlunosDoProfessor(setAlunos), []);
  useEffect(() => observarTreinosDoProfessor(setTreinos), []);
  useEffect(() => observarHistoricoDoProfessor(setHistorico), []);

  if (alunos === null) {
    return (
      <SafeAreaView style={global.tela} edges={["top", "bottom"]}>
        <Cabecalho titulo="Detalhes do aluno" />
        <Text style={styles.vazio}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  const aluno = alunos.find((item) => item.id === id);

  if (!aluno) {
    return (
      <SafeAreaView style={global.tela} edges={["top", "bottom"]}>
        <Cabecalho titulo="Detalhes do aluno" />
        <Text style={styles.vazio}>Aluno não encontrado.</Text>
      </SafeAreaView>
    );
  }


  const treinosAtribuidos = treinos.filter((treino) => treino.alunoId === id);
  const treinosConcluidos = historico.filter((item) => item.alunoId === id);

  return (
    <SafeAreaView style={global.tela} edges={["top", "bottom"]}>
      <Cabecalho titulo="Detalhes do aluno" />

      <ScrollView
        style={styles.rolagem}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <CartaoPessoa
          usuarioId={aluno.id}
          nome={aluno.nome}
          detalhe="Aluno vinculado"
          status="ativo"
          textoStatus="Vinculado"
          semBorda
        />

        <CartaoMeta
          titulo="Constância semanal"
          concluidos={contarNaSemana(treinosConcluidos)}
          meta={META_SEMANAL}
        />

        <Text style={styles.secao}>Treinos atribuídos</Text>
        {treinosAtribuidos.length === 0 ? (
          <Text style={styles.vazio}>Nenhum treino atribuído ainda.</Text>
        ) : (
          <View style={styles.grupo}>
            {treinosAtribuidos.map((treino, indice) => (
              <LinhaTreino
                key={treino.id}
                nome={treino.nome}
                info={`${treino.exercicios.length} exerc.`}
                ultima={indice === treinosAtribuidos.length - 1}
              />
            ))}
          </View>
        )}

        <Text style={styles.secao}>Treinos concluídos</Text>
        {treinosConcluidos.length === 0 ? (
          <Text style={styles.vazio}>Nenhum treino concluído ainda.</Text>
        ) : (
          <View style={styles.grupo}>
            {treinosConcluidos.map((item, indice) => (
              <LinhaTreino
                key={item.id}
                nome={item.treinoNome}
                info={descreverDia(item)}
                ultima={indice === treinosConcluidos.length - 1}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.rodape}>
        <Botao texto="Enviar mensagem" onPress={() => router.push(`/professor/chat/${aluno.id}`)} />
        <Botao
          texto="Novo treino para este aluno"
          secundario
          onPress={() =>
            router.push({ pathname: "/professor/treino/cadastro", params: { alunoId: aluno.id } })
          }
        />
      </View>
    </SafeAreaView>
  );
}