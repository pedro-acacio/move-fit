import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { colors } from "../../styles/theme";
import { useCorDaArea } from "../../context/CorDaArea";
import styles from "./Campo.styles";

export function Campo({ rotulo, placeholder, valor, aoMudarTexto, senha, erro, tipoTeclado, tamanhoMaximo, multilinha }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const cor = useCorDaArea();

  return (
    <View style={styles.container}>
      {rotulo && <Text style={styles.rotulo}>{rotulo}</Text>}
      <View style={styles.caixa}>
        <TextInput
          style={[styles.entrada, multilinha && styles.entradaMultilinha]}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          value={valor}
          onChangeText={aoMudarTexto}
          secureTextEntry={senha && !mostrarSenha}
          keyboardType={tipoTeclado}
          maxLength={tamanhoMaximo}
          multiline={multilinha}
        />
        {senha && (
          <Pressable onPress={() => setMostrarSenha((atual) => !atual)}>
            <Text style={[styles.acao, { color: cor }]}>{mostrarSenha ? "Ocultar" : "Mostrar"}</Text>
          </Pressable>
        )}
      </View>
      {erro && (
        <View style={styles.dica}>
          <Text style={styles.dicaTexto}>{erro}</Text>
        </View>
      )}
    </View>
  );
}
