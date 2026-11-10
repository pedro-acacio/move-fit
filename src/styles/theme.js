// Paleta do MoveFit: três cores base.
const primaryOrange = "#FF6B3E";
const black = "#332E2D";
const secondary = "#2121FF";

// Nomes usados pelas telas e componentes. Para mudar uma cor no app inteiro, mude aqui.
export const colors = {
  primaryOrange,
  black,
  secondary,

  fundo: "#ffffff",
  texto: black,
  textoMuted: "#776F6D", // black mais claro, para textos secundários
  placeholder: "#A69F9D",
  primaria: primaryOrange, // botões, aba selecionada, destaques (área do aluno e acesso)
  primariaProfessor: secondary, // mesmos destaques, na área do professor
  borda: "#E6E0DE",
  perigo: "#D32F2F", // vermelho padrão das ações destrutivas: Sair, Excluir, Remover
  dica: secondary, // dicas e avisos
  dicaFundo: "#EDEDFF", // fundo clarinho do secondary
  sombra: "rgba(51,46,45,0.4)", // black com transparência
};
