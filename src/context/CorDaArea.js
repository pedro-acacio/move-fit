import { createContext, useContext } from "react";
import { colors } from "../styles/theme";

// Cor de destaque de cada área do app: laranja no aluno (padrão) e azul no professor.
// O professor/_layout.jsx envolve as telas dele com <CorDaAreaProvider value={...}>.
// Os componentes pegam a cor com useCorDaArea() em vez de usar colors.primaria direto.
const CorDaArea = createContext(colors.primaria);

export const CorDaAreaProvider = CorDaArea.Provider;

export function useCorDaArea() {
  return useContext(CorDaArea);
}
