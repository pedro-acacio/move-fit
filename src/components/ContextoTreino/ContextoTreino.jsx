import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./ContextoTreino.styles";


export function ContextoTreino({ treinos, selecionado, aoSelecionar }) {
  const [aberto, setAberto] = useState(false);

  function escolher(treino) {
    aoSelecionar(treino);
    setAberto(false);
  }

  return (
    <View style={styles.caixa}>
      <View style={styles.linha}>
        <Text style={styles.texto}>Contexto: {selecionado.nome}</Text>
        <Pressable onPress={() => setAberto((atual) => !atual)} hitSlop={12}>
          <Text style={styles.acao}>{aberto ? "Fechar" : "Alterar"}</Text>
        </Pressable>
      </View>

      {aberto &&
        treinos.map((treino) => (
          <Pressable key={treino.id} style={styles.opcao} onPress={() => escolher(treino)}>
            <Text style={[styles.opcaoTexto, treino.id === selecionado.id && styles.opcaoAtual]}>
              {treino.nome}
            </Text>
          </Pressable>
        ))}
    </View>
  );
}
