import { ScrollView, Text, View } from "react-native";
import { Cabecalho } from "../../components/Cabecalho/Cabecalho";
import global from "../../styles/global";
import styles from "./Termos.styles";

// Termos de Uso e Política de Privacidade (LGPD, Lei 13.709/2018), abertos pelo Cadastro.
// O texto descreve o que o app realmente coleta hoje. Se um service passar a salvar
// um dado novo, atualize a seção 3 e a data abaixo.
// Para mudar o texto, edite a lista SECOES: cada item vira um título com os seus parágrafos.

const ATUALIZADO_EM = "15 de novembro de 2026";

const SECOES = [
  {
    titulo: "1. Quem somos",
    paragrafos: [
      "O MoveFit é um aplicativo criado como projeto acadêmico por um grupo de estudantes. Ele conecta alunos e professores de educação física para montar, enviar e acompanhar treinos.",
      "A equipe do projeto é a responsável (controladora) pelos dados tratados no app.",
      "Ao marcar a opção \"Li e aceito\" no cadastro, você declara que leu estes termos e concorda com eles. Sem esse aceite não é possível criar a conta.",
    ],
  },
  {
    titulo: "2. Quem pode usar",
    paragrafos: [
      "O app é para maiores de 18 anos. Menores de idade só podem usar com o consentimento de um dos pais ou responsável.",
      "Você deve informar dados verdadeiros e manter a sua senha em segredo. Professores devem informar um CREF válido.",
    ],
  },
  {
    titulo: "3. Dados que coletamos",
    paragrafos: [
      "No cadastro: nome completo, e-mail, senha, o tipo de perfil (aluno ou professor) e, para professores, o número do CREF. A senha é guardada de forma protegida pelo Firebase Authentication e nem a equipe consegue lê-la.",
      "Gerados pelo app: um código de 4 dígitos para o vínculo entre aluno e professor, a data do cadastro e a data em que você aceitou estes termos.",
      "Foto de perfil: somente se você escolher uma. A imagem é diminuída e guardada no seu perfil.",
      "Uso do app: vínculos entre alunos e professores; treinos e exercícios criados pelos professores; treinos concluídos pelos alunos, com data e hora (histórico e meta semanal); e as mensagens trocadas no chat, com data e hora.",
      "No aparelho: o app guarda a sua sessão de login no próprio celular ou navegador, para você não precisar entrar toda vez. Ela é apagada quando você toca em Sair.",
      "Não coletamos localização, contatos, dados de pagamento nem dados de saúde como peso, medidas ou exames.",
    ],
  },
  {
    titulo: "4. Para que usamos os dados",
    paragrafos: [
      "Usamos os dados só para o app funcionar: criar e acessar a sua conta, vincular aluno e professor, enviar e mostrar treinos, calcular histórico, metas e engajamento, e permitir o chat.",
      "A base legal é a execução do serviço que você pediu ao criar a conta e o seu consentimento (LGPD, art. 7º, incisos I e V). Não usamos os dados para publicidade e não os vendemos.",
    ],
  },
  {
    titulo: "5. Quem vê os seus dados",
    paragrafos: [
      "Aluno e professor vinculados veem o nome um do outro. O professor vê os treinos que enviou ao aluno e o histórico de treinos concluídos dele. As mensagens do chat são vistas só pelos dois.",
      "Professores: o nome e o CREF aparecem para todos os alunos na lista de professores da academia.",
      "Quem souber o seu código de 4 dígitos consegue criar um vínculo com você. Compartilhe o código só com quem você conhece.",
    ],
  },
  {
    titulo: "6. Serviços de terceiros",
    paragrafos: [
      "Os dados ficam guardados no Firebase (Authentication e Cloud Firestore), serviço do Google. Os servidores do Google podem ficar fora do Brasil, e por isso pode haver transferência internacional de dados, feita conforme as regras de proteção do próprio Google.",
      "Assistente IA: as perguntas que você escreve, as respostas anteriores da conversa e o nome do seu treino atual são enviados ao Gemini, serviço de inteligência artificial do Google, para gerar a resposta. O MoveFit não salva essas conversas, mas o Google pode tratar esse conteúdo conforme os termos dele. Não escreva dados pessoais ou de saúde nas perguntas.",
    ],
  },
  {
    titulo: "7. Permissões do celular",
    paragrafos: [
      "O app só pede acesso às suas fotos quando você toca para adicionar uma foto de perfil, e usa apenas a imagem que você escolher. Você pode negar o pedido ou retirar a permissão nas configurações do celular a qualquer momento, e o app continua funcionando sem foto.",
      "O app não usa a câmera, o microfone nem a localização.",
    ],
  },
  {
    titulo: "8. Por quanto tempo guardamos",
    paragrafos: [
      "Os dados ficam guardados enquanto a sua conta existir. Você pode apagar a sua conta a qualquer momento na aba Perfil, em \"Apagar minha conta\". Isso apaga o seu perfil, o seu histórico, os seus vínculos e as conversas do chat; no caso de professores, também os treinos e exercícios criados.",
    ],
  },
  {
    titulo: "9. Seus direitos",
    paragrafos: [
      "Pela LGPD (art. 18), você pode a qualquer momento: confirmar se tratamos os seus dados e ter acesso a eles; corrigir dados incompletos ou errados; pedir a exclusão dos dados e da conta; saber com quem os dados são compartilhados; e retirar o seu consentimento.",
      "Na aba Perfil você vê todos os dados do seu cadastro e pode apagar a sua conta. Para os outros pedidos, fale com a equipe do projeto. Você também pode reclamar à ANPD (Autoridade Nacional de Proteção de Dados).",
    ],
  },
  {
    titulo: "10. Segurança",
    paragrafos: [
      "O acesso aos dados exige login, e a comunicação com o Firebase e com o Gemini é criptografada. Nenhum sistema é totalmente imune a falhas; se acontecer um incidente que possa trazer risco a você, avisaremos.",
    ],
  },
  {
    titulo: "11. Saúde e responsabilidade",
    paragrafos: [
      "O MoveFit não substitui avaliação médica. Antes de começar qualquer treino, procure um profissional de saúde. Pare o exercício se sentir dor, tontura ou falta de ar.",
      "Os treinos são de responsabilidade do professor que os montou. As respostas do Assistente IA são apenas informativas e podem conter erros.",
    ],
  },
  {
    titulo: "12. Mudanças nestes termos",
    paragrafos: [
      "Estes termos podem ser atualizados. Quando isso acontecer, a data no topo desta página muda.",
    ],
  },
];

export default function Termos() {
  return (
    <ScrollView style={global.tela} contentContainerStyle={styles.conteudo}>
      <Cabecalho titulo="Termos de Uso" />

      <Text style={styles.titulo}>Termos de Uso e Política de Privacidade</Text>
      <Text style={styles.atualizado}>Atualizado em {ATUALIZADO_EM}</Text>

      {SECOES.map((secao) => (
        <View key={secao.titulo} style={styles.secao}>
          <Text style={styles.tituloSecao}>{secao.titulo}</Text>
          {secao.paragrafos.map((paragrafo) => (
            <Text key={paragrafo} style={styles.texto}>
              {paragrafo}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
