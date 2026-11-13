import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BotaoFlutuante } from "../../components/BotaoFlutuante/BotaoFlutuante";
import { CartaoMeta } from "../../components/CartaoMeta/CartaoMeta";
import { CartaoTreino } from "../../components/CartaoTreino/CartaoTreino";
import { Dica } from "../../components/Dica/Dica";
import { useUsuarioLogado } from "../../context/UsuarioLogado";
import { observarTreinosDoAluno } from "../../services/treinosService";
import global from "../../styles/global";
import { contarNaSemana, META_SEMANAL, observarHistoricoDoAluno } from "../../services/historicoService";
import styles from "./InicioAluno.styles";

// Home do aluno (RF15, RF17): meta semanal, treinos enviados pelo professor e atalho para a IA.
const DICA = "Dica do MoveFit: mantenha a hidratação constante durante o treino.";

export default function InicioAluno() {
  const { usuario } = useUsuarioLogado();
  const [treinos, setTreinos] = useState([]);
  const [historico, setHistorico] = useState([]);
  // "concluido" chega quando o aluno finaliza um treino nos Detalhes do treino (RF16.1).
  const { concluido } = useLocalSearchParams();

  useEffect(() => observarTreinosDoAluno(setTreinos), []);
  useEffect(() => observarHistoricoDoAluno(setHistorico), []);

  const meta = META_SEMANAL;
  const concluidosNaSemana = contarNaSemana(historico);

  const faltam = meta - concluidosNaSemana;
  const fraseMeta =
    faltam > 0
      ? faltam === 1
        ? "Falta 1 treino para bater a meta."
        : `Faltam ${faltam} treinos para bater a meta.`
      : "Parabéns! Você bateu a meta da semana.";

  return (
    <SafeAreaView style={global.tela} edges={["top"]}>
      <View style={styles.topo}>
        <Text style={styles.saudacao}>Olá, {usuario?.nome}</Text>
        <Pressable style={styles.foto} onPress={() => router.navigate("/aluno/perfil")}>
          <Text style={styles.fotoTexto}>👤</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        <CartaoMeta
          titulo="Meta semanal"
          concluidos={concluidosNaSemana}
          meta={meta}
          frase={fraseMeta}
        />

        {concluido && <Dica texto={`${concluido} concluído e registrado no histórico.`} />}

        <Text style={styles.secao}>Seus treinos</Text>

        {treinos.length === 0 ? (
          <Text style={styles.vazio}>Seu professor ainda não enviou um treino.</Text>
        ) : (
          treinos.map((treino) => (
            <CartaoTreino
              key={treino.id}
              titulo={treino.nome}
              detalhe={`${treino.exercicios.length} exercícios`}
              onPress={() => router.push(`/aluno/treino/${treino.id}`)}
            />
          ))
        )}

        <Dica texto={DICA} />
      </ScrollView>

      <BotaoFlutuante texto="Assistente IA" onPress={() => router.push("/aluno/assistente")} />
    </SafeAreaView>
  );
}
