import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Botao } from "../../components/Botao/Botao";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { CartaoMeta } from "../../components/CartaoMeta/CartaoMeta";
import { CartaoPessoa } from "../../components/CartaoPessoa/CartaoPessoa";
import { LinhaTreino } from "../../components/LinhaTreino/LinhaTreino";
import global from "../../styles/global";
import dados from "./dados.json";
import styles from "./DetalhesAluno.styles";

// Detalhes do aluno (RF05.1, RF13): constância, treinos atribuídos e treinos concluídos.
// TODO: trocar o dados.json pelos dados do aluno vindos do Firebase, usando o id da rota.
export default function DetalhesAluno() {
  const { id } = useLocalSearchParams();
  const aluno = dados.alunos.find((item) => item.id === id);

  if (!aluno) {
    return (
      <SafeAreaView style={global.tela} edges={["top", "bottom"]}>
        <Cabecalho titulo="Detalhes do aluno" />
        <Text style={styles.vazio}>Aluno não encontrado.</Text>
      </SafeAreaView>
    );
  }

  const ativo = aluno.status === "ativo";
  const { treinosAtribuidos, treinosConcluidos } = aluno;

  return (
    <SafeAreaView style={global.tela} edges={["top", "bottom"]}>
      <Cabecalho titulo="Detalhes do aluno" />

      <ScrollView
        style={styles.rolagem}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <CartaoPessoa
          nome={aluno.nome}
          detalhe={aluno.email}
          status={aluno.status}
          textoStatus={aluno.vinculo}
          semBorda
        />

        {!ativo && <Text style={styles.vazio}>Aguardando confirmação do aluno.</Text>}

        {ativo && (
          <>
            <CartaoMeta
              titulo="Constância semanal"
              concluidos={aluno.concluidosNaSemana}
              meta={aluno.meta}
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
                    info={`${treino.exercicios} exerc.`}
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
                {treinosConcluidos.map((treino, indice) => (
                  <LinhaTreino
                    key={treino.id}
                    nome={treino.nome}
                    info={treino.dia}
                    ultima={indice === treinosConcluidos.length - 1}
                  />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>

      {ativo && (
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
      )}
    </SafeAreaView>
  );
}