import { router } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartaoPessoa } from "../../components/CartaoPessoa/CartaoPessoa";
import { VincularCodigo } from "../../components/VincularCodigo/VincularCodigo";
import global from "../../styles/global";
import dados from "./dados.json";
import styles from "./Professores.styles";

// Aba Professores do aluno (RF19): vínculo por código e listas de professores.
// TODO: trocar o dados.json pelos professores do aluno logado vindos do Firebase.
export default function Professores() {
  const { meusProfessores, professoresAcademia } = dados;

  return (
    <SafeAreaView style={global.tela} edges={["top"]}>
      <Text style={styles.titulo}>Professores</Text>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <VincularCodigo
          titulo="Vincular por código"
          descricao="Digite o código de 4 dígitos do professor."
        />

        <Text style={styles.secao}>Meus professores</Text>
        {meusProfessores.map((professor) => {
          const vinculado = professor.status === "vinculado";

          return (
            <CartaoPessoa
              key={professor.id}
              nome={professor.nome}
              detalhe={vinculado ? "Vinculado · toque para conversar" : "Aguardando confirmação"}
              status={vinculado ? undefined : "pendente"}
              seta={vinculado}
              onPress={vinculado ? () => router.push(`/aluno/chat/${professor.id}`) : undefined}
            />
          );
        })}

        <Text style={styles.secao}>Professores da academia</Text>
        {professoresAcademia.map((professor) => (
          <CartaoPessoa key={professor.id} nome={professor.nome} detalhe={professor.area} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}