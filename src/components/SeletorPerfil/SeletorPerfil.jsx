import { Pressable, Text, View } from "react-native";
import styles from "./SeletorPerfil.styles";

const opcoes = [
  { chave: "aluno", rotulo: "Aluno" },
  { chave: "professor", rotulo: "Professor" },
];

export function SeletorPerfil({ valor, aoMudar }) {
  return (
    <View style={styles.container}>
      {opcoes.map((opcao) => {
        const selecionada = opcao.chave === valor;
        return (
          <Pressable
            key={opcao.chave}
            style={[styles.opcao, selecionada && styles.opcaoSelecionada]}
            onPress={() => aoMudar(opcao.chave)}
          >
            <Text style={[styles.texto, selecionada && styles.textoSelecionado]}>
              {opcao.rotulo}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
