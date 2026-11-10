import dados from "../../assets/data/exercises.json";
import { nomesPt } from "./nomesPt";

const REGIAO = {
  abdominals: "Abdômen",
  abductors: "Pernas",
  adductors: "Pernas",
  biceps: "Bíceps",
  calves: "Pernas",
  chest: "Peitoral",
  forearms: "Antebraço",
  glutes: "Pernas",
  hamstrings: "Pernas",
  lats: "Costas",
  "lower back": "Costas",
  "middle back": "Costas",
  neck: "Pescoço",
  quadriceps: "Pernas",
  shoulders: "Ombro",
  traps: "Costas",
  triceps: "Tríceps",
};

const EQUIPAMENTO = {
  "body only": "peso do corpo",
  barbell: "barra",
  dumbbell: "halteres",
  machine: "máquina",
  cable: "cabo",
  kettlebells: "kettlebell",
  bands: "elástico",
  "medicine ball": "bola medicinal",
  "exercise ball": "bola suíça",
  "e-z curl bar": "barra EZ",
  "foam roll": "rolo de espuma",
  other: "equipamento variado",
};

const DIFICULDADE = {
  beginner: "iniciante",
  intermediate: "intermediário",
  expert: "avançado",
};

let exerciciosAdaptados = null;

function adaptar(exercicio) {
  const musculoPrincipal = exercicio.primaryMuscles[0];

  return {
    id: exercicio.id,
    nome: exercicio.name,
    nomePt: nomesPt[exercicio.id] ?? exercicio.name,
    grupo: REGIAO[musculoPrincipal] ?? "Outros",
    equipamento: EQUIPAMENTO[exercicio.equipment] ?? "sem equipamento",
    dificuldade: DIFICULDADE[exercicio.level] ?? exercicio.level,
    alvo: musculoPrincipal,
    musculosSecundarios: exercicio.secondaryMuscles,
    instrucoes: exercicio.instructions,
    imagens: exercicio.images,
    categoria: exercicio.category,
  };
}

function carregarExercicios() {
  if (!exerciciosAdaptados) {
    exerciciosAdaptados = dados.map(adaptar);
  }
  return exerciciosAdaptados;
}

export function listarTodosExercicios() {
  return carregarExercicios();
}

export function buscarExercicioPorId(id) {
  return carregarExercicios().find((exercicio) => exercicio.id === id);
}

export function buscarExercicios(nome) {
  const termo = nome.trim().toLowerCase();
  if (!termo) return carregarExercicios();

  return carregarExercicios().filter(
    (exercicio) =>
      exercicio.nomePt.toLowerCase().includes(termo) || exercicio.nome.toLowerCase().includes(termo)
  );
}

export function descricaoCurta(exercicio) {
  return `Exercício de ${exercicio.grupo.toLowerCase()}, com ${exercicio.equipamento}.`;
}
