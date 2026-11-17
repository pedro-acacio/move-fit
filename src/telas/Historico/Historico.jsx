import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartaoHistorico } from "../../components/CartaoHistorico/CartaoHistorico";
import { CartaoMeta } from "../../components/CartaoMeta/CartaoMeta";
import {
  contarNaSemana,
  descreverDia,
  META_SEMANAL,
  observarHistoricoDoAluno,
} from "../../services/historicoService";
import global from "../../styles/global";
import styles from "./Historico.styles";



export default function Historico() {
  const [historico,setHistorico] = useState([]);


  useEffect(() => observarHistoricoDoAluno(setHistorico), []);

  return (
    <SafeAreaView style={global.tela} edges={["top"]}>
      <Text style={styles.titulo}>Histórico</Text>

      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        <CartaoMeta titulo="Esta semana" concluidos={contarNaSemana(historico)} meta={META_SEMANAL} />

        <Text style={styles.secao}>Treinos concluídos</Text>

        {historico.length === 0 ? (
          <Text style={styles.vazio}>Nenhum treino concluído ainda.</Text>
        ) : (
          historico.map((item) => (
            <CartaoHistorico
              key={item.id}
              titulo={item.treinoNome}
              detalhe={`${descreverDia(item)} · ${item.exercicios} exercícios`}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}