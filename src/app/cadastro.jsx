import { useState } from "react";
import { ScrollView, Text } from "react-native";
import { Botao } from "../components/Botao/Botao";
import { Cabecalho } from "../components/Cabecalho/Cabecalho";
import { Campo } from "../components/Campo/Campo";
import { SeletorPerfil } from "../components/SeletorPerfil/SeletorPerfil";
import global from "../styles/global";
import styles from "./cadastro.styles";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("aluno");
  const [cref, setCref] = useState("");

  return (
    <ScrollView style={global.tela} contentContainerStyle={styles.conteudo}>
      <Cabecalho titulo="Criar conta" />

      <Text style={styles.titulo}>Comece sua jornada</Text>
      <Text style={styles.subtitulo}>Preencha os dados para criar sua conta no MoveFit.</Text>

      <Campo rotulo="Nome completo" placeholder="Ex.: João Silva" valor={nome} aoMudarTexto={setNome} />

      <Campo
        rotulo="E-mail"
        placeholder="email@exemplo.com"
        valor={email}
        aoMudarTexto={setEmail}
        tipoTeclado="email-address"
      />

      <Campo
        rotulo="Senha"
        placeholder="Mínimo de 8 caracteres"
        valor={senha}
        aoMudarTexto={setSenha}
        senha
      />

      <Text style={styles.rotuloPerfil}>Eu sou</Text>
      <SeletorPerfil valor={perfil} aoMudar={setPerfil} />

      {perfil === "professor" && (
        <Campo rotulo="CREF" placeholder="Ex.: 123456-G/SP" valor={cref} aoMudarTexto={setCref} />
      )}

      <Text style={styles.observacao}>
        Ao concluir, o app gera o seu código de 4 dígitos para vínculo entre aluno e professor.
      </Text>

      <Botao texto="Cadastrar" onPress={() => {}} />
    </ScrollView>
  );
}
