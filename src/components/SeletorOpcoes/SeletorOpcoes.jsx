import { Pressable, Text, View } from "react-native";
import styles from "./SeletorOpcoes.styles";

// Lista de opções em "pílulas" para escolher uma (ex.: o aluno do treino).
// opcoes = [{ chave: "1", rotulo: "Antonio" }, ...]
export function SeletorOpcoes({ opcoes, valor, aoMudar }) {
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
