import { useUsuarioLogado } from "../../context/UsuarioLogado";
import { sair } from "../../services/autenticacao";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Botao } from "../../components/Botao/Botao";
import { FotoPerfil } from "../../components/FotoPerfil/FotoPerfil";
import { InfoPerfil } from "../../components/InfoPerfil/InfoPerfil";
import { useCorDaArea } from "../../context/CorDaArea";
import { escolherFotoDePerfil } from "../../services/fotoPerfilService";
import global from "../../styles/global";
import styles from "./Perfil.styles";

const AVISOS = {
  aluno: "Informe este código ao professor para vincular a sua conta.",
  professor: "Informe este código ao aluno, ou digite o dele na aba Alunos, para criar o vínculo.",
};

// Perfil do aluno e do professor (RF14): mostra os dados de quem está logado.
// A prop "tipo" diz qual aviso mostrar embaixo do código.
export default function Perfil({ tipo }) {
  const { usuario } = useUsuarioLogado();
  const cor = useCorDaArea();
  const [enviando, setEnviando] = useState(false);
  const [erroFoto, setErroFoto] = useState("");

  // Toque na foto: escolhe uma imagem da galeria e salva no perfil.
  // A foto nova aparece sozinha, porque o usuário logado é lido em tempo real.
  async function trocarFoto() {
    setErroFoto("");
    setEnviando(true);
    try {
      await escolherFotoDePerfil();
    } catch {
      setErroFoto("Não foi possível salvar a foto. Tente de novo.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={global.tela} edges={["top"]}>
      <Text style={styles.titulo}>Perfil</Text>

      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        <FotoPerfil foto={usuario?.foto} tamanho={96} onPress={trocarFoto} desativado={enviando} />
        <Text style={[styles.trocarFoto, { color: cor }]} onPress={enviando ? undefined : trocarFoto}>
          {enviando ? "Salvando foto..." : usuario?.foto ? "Trocar foto" : "Adicionar foto"}
        </Text>
        {erroFoto !== "" && <Text style={styles.erroFoto}>{erroFoto}</Text>}

        <InfoPerfil rotulo="Nome" valor={usuario?.nome ?? "..."} />
        <InfoPerfil rotulo="E-mail" valor={usuario?.email ?? "..."} />
        {usuario?.cref && <InfoPerfil rotulo="CREF" valor={usuario.cref} />}

        <View style={styles.cartaoCodigo}>
          <Text style={styles.rotuloCodigo}>Seu código</Text>
          <Text style={[styles.codigo, { color: cor }]}>{usuario?.codigo ?? "...."}</Text>
          <Text style={styles.avisoCodigo}>{AVISOS[tipo]}</Text>
        </View>

        <Botao texto="Sair" perigo onPress={sair} />
      </ScrollView>
    </SafeAreaView>
  );
}
