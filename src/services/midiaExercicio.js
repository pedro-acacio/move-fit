const BASE = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";

export const imagensCuradas = {};

export function imagensDoExercicio(exercicio) {
  if (imagensCuradas[exercicio.id]) return imagensCuradas[exercicio.id];

  return (exercicio.imagens ?? []).map(
    (caminho) => BASE + caminho.split("/").map(encodeURIComponent).join("/")
  );
}
