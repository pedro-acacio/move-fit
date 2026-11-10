import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Botao } from "../../components/Botao/Botao";
import { InfoPerfil } from "../../components/InfoPerfil/InfoPerfil";
import global from "../../styles/global";
import dados from "./dados.json";
import { useCorDaArea } from "../../context/CorDaArea";
import styles from "./Perfil.styles";

const AVISOS = {
  aluno: "Informe este código ao professor para vincular a sua conta.",
  professor: "Informe este código ao aluno, ou digite o dele na aba Alunos, para criar o vínculo.",
};

// Perfil do aluno e do professor (RF14): a prop "tipo" diz qual dos dois mostrar.
// TODO: trocar o dados.json pelos dados do usuário logado vindos do Firebase.
export default function Perfil({ tipo }) {
  const { nome, email, codigo } = dados[tipo];
  const cor = useCorDaArea();

  // TODO: encerrar a sessão no Firebase antes de voltar para o login.
  function sair() {
    router.replace("/login");
  }

  return (
    <SafeAreaView style={global.tela} edges={["top"]}>
      <Text style={styles.titulo}>Perfil</Text>

      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        <View style={styles.icone}>
          <Text style={styles.iconeTexto}>👤</Text>
        </View>

        <InfoPerfil rotulo="Nome" valor={nome} />
        <InfoPerfil rotulo="E-mail" valor={email} />

        <View style={styles.cartaoCodigo}>
          <Text style={styles.rotuloCodigo}>Seu código</Text>
          <Text style={[styles.codigo, { color: cor }]}>{codigo}</Text>
          <Text style={styles.avisoCodigo}>{AVISOS[tipo]}</Text>
        </View>

        <Botao texto="Sair" perigo onPress={sair} />
      </ScrollView>
    </SafeAreaView>
  );
}
