// Conversa com a API do Gemini (Google) e devolve a resposta em texto.
// A chave fica no arquivo .env.local (que não vai para o GitHub):
//   EXPO_PUBLIC_GEMINI_API_KEY=sua-chave
// Depois de criar ou mudar o .env.local, reinicie o "npx expo start".

const CHAVE = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
// Se um dia der erro 404 (modelo aposentado), troque pelo Flash mais novo
// listado em https://ai.google.dev/gemini-api/docs/models
const MODELO = "gemini-3.5-flash";
const ENDERECO = `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:generateContent`;

// Instrução fixa que diz ao Gemini quem ele é dentro do app.
const INSTRUCAO =
  "Você é a assistente do MoveFit, um app de treinos de academia. " +
  "Responda sempre em português do Brasil, de forma curta, clara e motivadora. " +
  "Fale só sobre treino, exercícios, alongamento, descanso e hábitos saudáveis. " +
  "Não dê diagnóstico médico: em caso de dor ou lesão, oriente procurar um profissional. " +
  "Não use markdown (nada de asteriscos ou #), só texto simples.";

// historico: lista de mensagens no formato { autor: "usuario" | "ia", texto: "..." }
export async function perguntarGemini(historico) {
  if (!CHAVE) {
    throw new Error("Chave do Gemini não configurada. Crie o arquivo .env.local com EXPO_PUBLIC_GEMINI_API_KEY.");
  }

  const resposta = await fetch(ENDERECO, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": CHAVE,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: INSTRUCAO }] },
      // O Gemini chama o usuário de "user" e a IA de "model".
      contents: historico.map((mensagem) => ({
        role: mensagem.autor === "usuario" ? "user" : "model",
        parts: [{ text: mensagem.texto }],
      })),
    }),
  });

  // 503 = servidores do Gemini lotados naquele momento; costuma passar rápido.
  if (resposta.status === 503) {
    throw new Error("A assistente está muito ocupada agora. Espere alguns segundos e tente de novo.");
  }

  if (!resposta.ok) {
    throw new Error("Não foi possível falar com a assistente agora (erro " + resposta.status + ").");
  }

  const dados = await resposta.json();
  const texto = dados.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!texto) {
    throw new Error("A assistente não conseguiu responder. Tente perguntar de outro jeito.");
  }

  return texto.trim();
}
