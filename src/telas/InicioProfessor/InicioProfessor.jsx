import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartaoAluno } from "../../components/CartaoAluno/CartaoAluno";
import { CartaoMeta } from "../../components/CartaoMeta/CartaoMeta";
import { CartaoNumero } from "../../components/CartaoNumero/CartaoNumero";
import global from "../../styles/global";
import dados from "./dados.json";
import styles from "./InicioProfessor.styles";

// Dashboard do professor (RF12, RF13): engajamento da turma, totais e constância de cada aluno.
// TODO: trocar o dados.json pelos alunos vinculados vindos do Firebase.
export default function InicioProfessor() {
  const { nome, alunos } = dados;

  // Totais (RF12). "Pendente" = vínculo ainda não confirmado pelo aluno.
  const total = alunos.length;
  const ativos = alunos.filter((aluno) => aluno.status === "ativo");
  const pendentes = total - ativos.length;

  // Engajamento = quantos alunos ativos concluíram pelo menos 1 treino nesta semana.
  const engajados = ativos.filter((aluno) => aluno.concluidosNaSemana > 0).length;
  const porcentagem = ativos.length > 0 ? Math.round((engajados / ativos.length) * 100) : 0;

  function detalheDoAluno(aluno) {
    if (aluno.status === "pendente") return "Aguardando confirmação do aluno";
    if (aluno.concluidosNaSemana === 0) return "Sem treinos concluídos esta semana";
    return `${aluno.concluidosNaSemana} de ${aluno.meta} treinos esta semana`;
  }

  return (
    <SafeAreaView style={global.tela} edges={["top"]}>
      <View style={styles.topo}>
        <Text style={styles.saudacao}>Olá, Prof. {nome}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        <CartaoMeta
          titulo="Engajamento da turma"
          concluidos={engajados}
          meta={ativos.length}
          contagem={`${porcentagem}%`}
          frase="Alunos que concluíram treinos nesta semana."
        />

        <View style={styles.numeros}>
          <CartaoNumero valor={total} rotulo="Total de usuários" />
          <CartaoNumero valor={ativos.length} rotulo="Ativos" />
          <CartaoNumero valor={pendentes} rotulo="Pendentes" />
        </View>

        <View style={styles.linhaSecao}>
          <Text style={styles.secao}>Constância dos alunos</Text>
          <Pressable onPress={() => router.navigate("/professor/alunos")} hitSlop={12}>
            <Text style={styles.link}>Ver todos</Text>
          </Pressable>
        </View>

        {alunos.length === 0 ? (
          <Text style={styles.vazio}>
            Nenhum aluno vinculado ainda. Vincule pelo código na aba Alunos.
          </Text>
        ) : (
          alunos.map((aluno) => (
            <CartaoAluno
              key={aluno.id}
              nome={aluno.nome}
              detalhe={detalheDoAluno(aluno)}
              status={aluno.status}
              onPress={() => router.push(`/professor/aluno/${aluno.id}`)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
