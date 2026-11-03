import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BotaoFlutuante } from "../../components/BotaoFlutuante/BotaoFlutuante";
import { CartaoMeta } from "../../components/CartaoMeta/CartaoMeta";
import { CartaoTreino } from "../../components/CartaoTreino/CartaoTreino";
import { Dica } from "../../components/Dica/Dica";
import global from "../../styles/global";
import dados from "./dados.json";
import styles from "./InicioAluno.styles";

// Home do aluno (RF15, RF17): meta semanal, treinos enviados pelo professor e atalho para a IA.
// TODO: trocar o dados.json pelos dados do aluno logado vindos do Firebase.
export default function InicioAluno() {
  const { nome, meta, concluidosNaSemana, dica, treinos } = dados;

  const faltam = meta - concluidosNaSemana;
  const fraseMeta =
    faltam > 0
      ? `Faltam ${faltam} ${faltam === 1 ? "treino" : "treinos"} para bater a meta.`
      : "Parabéns! Você bateu a meta da semana.";

  return (
    <SafeAreaView style={global.tela} edges={["top"]}>
      <View style={styles.topo}>
        <Text style={styles.saudacao}>Olá, {nome}</Text>
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

        <Text style={styles.secao}>Seus treinos</Text>

        {treinos.length === 0 ? (
          <Text style={styles.vazio}>Seu professor ainda não enviou um treino.</Text>
        ) : (
          treinos.map((treino) => (
            <CartaoTreino
              key={treino.id}
              titulo={treino.nome}
              detalhe={`${treino.duracao} min · ${treino.exercicios} exercícios`}
              onPress={() => router.push(`/aluno/treino/${treino.id}`)}
            />
          ))
        )}

        <Dica texto={dica} />
      </ScrollView>

      <BotaoFlutuante texto="Assistente IA" onPress={() => router.push("/aluno/assistente")} />
    </SafeAreaView>
  );
}
