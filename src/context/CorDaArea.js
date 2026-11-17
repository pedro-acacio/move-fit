import { createContext, useContext } from "react";
import { colors } from "../styles/theme";




const CorDaArea = createContext(colors.primaria);

export const CorDaAreaProvider = CorDaArea.Provider;

export function useCorDaArea() {
  return useContext(CorDaArea);
}
