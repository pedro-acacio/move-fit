import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Campo } from "../../components/Campo/Campo";
import { CartaoPessoa } from "../../components/CartaoPessoa/CartaoPessoa";
import { VincularCodigo } from "../../components/VincularCodigo/VincularCodigo";
import global from "../../styles/global";
import styles from "./Alunos.styles";
import dados from "./dados.json";

// Aba Alunos do professor (RF10): vínculo por código, busca e lista de alunos.
// TODO: trocar o dados.json pelos alunos do professor logado vindos do Firebase.
export default function Alunos() {
  const [busca, setBusca] = useState("");

  const termo = busca.trim().toLowerCase();
  const alunosEncontrados = dados.alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(termo)
  );

  return (
    <SafeAreaView style={global.tela} edges={["top"]}>
      <Text style={styles.titulo}>Alunos</Text>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <VincularCodigo
          titulo="Vincular aluno por código"
          descricao="Digite o código de 4 dígitos do aluno."
        />

        <View style={styles.busca}>
          <Campo placeholder="Buscar aluno pelo nome" valor={busca} aoMudarTexto={setBusca} />
        </View>

        {alunosEncontrados.length === 0 ? (
          <Text style={styles.vazio}>Nenhum aluno encontrado.</Text>
        ) : (
          alunosEncontrados.map((aluno) => (
            <CartaoPessoa
              key={aluno.id}
              nome={aluno.nome}
              detalhe={aluno.detalhe}
              status={aluno.status}
              onPress={aluno.status === "ativo" ? () => router.push(`/professor/aluno/${aluno.id}`) : undefined}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}