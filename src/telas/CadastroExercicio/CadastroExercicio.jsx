import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Botao } from "../../components/Botao/Botao";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import { Campo } from "../../components/Campo/Campo";
import { Dica } from "../../components/Dica/Dica";
import global from "../../styles/global";
import styles from "./CadastroExercicio.styles";

// Cadastro de exercício (RF07, RF07.2): a mesma tela serve para criar e para editar.
// Na edição, a aba Exercícios manda id, nome, descrição e grupo pelos parâmetros.
export default function CadastroExercicio() {
  const params = useLocalSearchParams();
  const editando = Boolean(params.id);

  const [nome, setNome] = useState(params.nome ?? "");
  const [instrucoes, setInstrucoes] = useState(params.descricao ?? "");
  const [erro, setErro] = useState(null);

  // TODO: salvar o exercício no Firebase (RF07.4).
  function salvar() {
    if (!nome.trim() || !instrucoes.trim()) {
      setErro("Preencha o nome e as instruções.");
      return;
    }

    const exercicio = {
      id: params.id ?? String(Date.now()),
      nome: nome.trim(),
      grupo: params.grupo ?? "",
      descricao: instrucoes.trim(),
    };
    router.dismissTo({
      pathname: "/professor/exercicios",
      params: { salvo: JSON.stringify(exercicio) },
    });
  }

  return (
    <SafeAreaView style={global.tela} edges={["top", "bottom"]}>
      <Cabecalho titulo={editando ? "Editar exercício" : "Cadastrar exercício"} />

      <ScrollView
        style={styles.rolagem}
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <Campo
          rotulo="Nome do exercício"
          placeholder="Ex.: Supino Reto"
          valor={nome}
          aoMudarTexto={setNome}
        />

        <Campo
          rotulo="Instruções de execução"
          placeholder="Descreva em passos curtos como executar o exercício corretamente."
          valor={instrucoes}
          aoMudarTexto={setInstrucoes}
          multilinha
        />

        <Text style={styles.observacao}>Campos obrigatórios: nome e instruções.</Text>

        {erro && (
          <View style={styles.erro}>
            <Dica texto={erro} />
          </View>
        )}
      </ScrollView>

      <View style={styles.rodape}>
        <Botao texto="Salvar exercício" onPress={salvar} />
        <Botao texto="Cancelar" secundario onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}
