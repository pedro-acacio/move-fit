import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartaoPessoa } from "../../components/CartaoPessoa/CartaoPessoa";
import { VincularCodigo } from "../../components/VincularCodigo/VincularCodigo";
import { observarProfessoresDaAcademia, observarProfessoresDoAluno } from "../../services/vinculoService";
import global from "../../styles/global";
import styles from "./Professores.styles";


export default function Professores() {
  const [meusProfessores, setMeusProfessores] = useState([]);
  const [professoresAcademia, setProfessoresAcademia] = useState([]);

  useEffect(() => observarProfessoresDoAluno(setMeusProfessores), []);
  useEffect(() => observarProfessoresDaAcademia(setProfessoresAcademia), []);


  const outrosProfessores = professoresAcademia.filter(
    (professor) => !meusProfessores.some((meu) => meu.id === professor.id)
  );

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
        {meusProfessores.length === 0 ? (
          <Text style={styles.vazio}>Nenhum professor vinculado ainda.</Text>
        ) : (
          meusProfessores.map((professor) => (
            <CartaoPessoa
              key={professor.id}
              usuarioId={professor.id}
              nome={professor.nome}
              detalhe="Vinculado · toque para conversar"
              seta
              onPress={() => router.push(`/aluno/chat/${professor.id}`)}
            />
          ))
        )}

        <Text style={styles.secao}>Professores da academia</Text>
        {outrosProfessores.length === 0 ? (
          <Text style={styles.vazio}>Nenhum outro professor cadastrado.</Text>
        ) : (
          outrosProfessores.map((professor) => (
            <CartaoPessoa
              key={professor.id}
              usuarioId={professor.id}
              nome={professor.nome}
              detalhe={professor.cref ? `CREF ${professor.cref}` : "Professor"}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
