import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Campo } from "../../components/Campo/Campo";
import { CartaoPessoa } from "../../components/CartaoPessoa/CartaoPessoa";
import { VincularCodigo } from "../../components/VincularCodigo/VincularCodigo";
import { observarAlunosDoProfessor } from "../../services/vinculoService";
import global from "../../styles/global";
import styles from "./Alunos.styles";

// Aba Alunos do professor (RF10): vínculo por código, busca e lista de alunos.
export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => observarAlunosDoProfessor(setAlunos), []);

  const termo = busca.trim().toLowerCase();
  const alunosEncontrados = alunos.filter((aluno) => aluno.nome.toLowerCase().includes(termo));

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
              usuarioId={aluno.id}
              nome={aluno.nome}
              detalhe="Vinculado"
              seta
              onPress={() => router.push(`/professor/aluno/${aluno.id}`)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
