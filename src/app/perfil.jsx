import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Botao } from "../components/Botao/Botao";
import { Cabecalho } from "../components/Cabecalho/Cabecalho";
import { Campo } from "../components/Campo/Campo";
import global from "../styles/global";
import styles from "./perfil.styles";

export default function Perfil() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");

  return (
    <ScrollView style={global.tela} contentContainerStyle={styles.conteudo}>
      <Cabecalho titulo="Perfil" />

      <View style={styles.corpo}>
        <View style={styles.icone}>
          <Text style={styles.iconeTexto}>👤</Text>
        </View>

        <Campo rotulo="Nome" placeholder="João Silva" valor={nome} aoMudarTexto={setNome} />

        <Campo
          rotulo="E-mail"
          placeholder="email@exemplo.com"
          valor={email}
          aoMudarTexto={setEmail}
          tipoTeclado="email-address"
        />

        <Campo
          rotulo="Código"
          placeholder="0000"
          valor={codigo}
          aoMudarTexto={setCodigo}
          tipoTeclado="numeric"
          tamanhoMaximo={4}
        />

        <Botao texto="Salvar" onPress={() => {}} />
      </View>
    </ScrollView>
  );
}
