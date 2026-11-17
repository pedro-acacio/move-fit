import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnelProgresso } from "../../components/AnelProgresso/AnelProgresso";
import { CartaoAluno } from "../../components/CartaoAluno/CartaoAluno";
import { CartaoMeta } from "../../components/CartaoMeta/CartaoMeta";
import { CartaoNumero } from "../../components/CartaoNumero/CartaoNumero";
import { useCorDaArea } from "../../context/CorDaArea";
import { useUsuarioLogado } from "../../context/UsuarioLogado";
import {
  contarHoje,
  contarNaSemana,
  META_SEMANAL,
  observarHistoricoDoProfessor,
} from "../../services/historicoService";
import { observarAlunosDoProfessor } from "../../services/vinculoService";
import global from "../../styles/global";
import styles from "./InicioProfessor.styles";



export default function InicioProfessor() {
  const { usuario } = useUsuarioLogado();
  const cor = useCorDaArea();
  const [alunos, setAlunos] = useState([]);
  const [historico, setHistorico] = useState([]);

  useEffect(() => observarAlunosDoProfessor(setAlunos), []);
  useEffect(() => observarHistoricoDoProfessor(setHistorico), []);


  const resumo = alunos.map((aluno) => {
    const doAluno = historico.filter((item) => item.alunoId === aluno.id);
    return {
      ...aluno,
      concluidosNaSemana: contarNaSemana(doAluno),
      treinouHoje: contarHoje(doAluno) > 0,
    };
  });


  const total = resumo.length;
  const treinaramNaSemana = resumo.filter((aluno) => aluno.concluidosNaSemana > 0).length;
  const semTreinar = total - treinaramNaSemana;
  const treinaramHoje = resumo.filter((aluno) => aluno.treinouHoje).length;


  const porcentagem = total > 0 ? Math.round((treinaramNaSemana / total) * 100) : 0;

  function detalheDoAluno(aluno) {
    if (aluno.concluidosNaSemana === 0) return "Sem treinos concluídos esta semana";
    return `${aluno.concluidosNaSemana} de ${META_SEMANAL} treinos esta semana`;
  }

  return (
    <SafeAreaView style={global.tela} edges={["top"]}>
      <View style={styles.topo}>
        <Text style={styles.saudacao}>Olá, Prof. {usuario?.nome}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        <View style={styles.anel}>
          <AnelProgresso concluidos={treinaramHoje} total={total} rotulo="fizeram o treino hoje" />
        </View>

        <CartaoMeta
          titulo="Engajamento da turma"
          concluidos={treinaramNaSemana}
          meta={total}
          contagem={`${porcentagem}%`}
          frase="Alunos que concluíram treinos nesta semana."
        />

        <View style={styles.numeros}>
          <CartaoNumero valor={total} rotulo="Alunos" />
          <CartaoNumero valor={treinaramNaSemana} rotulo="Treinaram na semana" />
          <CartaoNumero valor={semTreinar} rotulo="Sem treinar" />
        </View>

        <View style={styles.linhaSecao}>
          <Text style={styles.secao}>Constância dos alunos</Text>
          <Pressable onPress={() => router.navigate("/professor/alunos")} hitSlop={12}>
            <Text style={[styles.link, { color: cor }]}>Ver todos</Text>
          </Pressable>
        </View>

        {resumo.length === 0 ? (
          <Text style={styles.vazio}>
            Nenhum aluno vinculado ainda. Vincule pelo código na aba Alunos.
          </Text>
        ) : (
          resumo.map((aluno) => (
            <CartaoAluno
              key={aluno.id}
              nome={aluno.nome}
              detalhe={detalheDoAluno(aluno)}
              status="ativo"
              onPress={() => router.push(`/professor/aluno/${aluno.id}`)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}