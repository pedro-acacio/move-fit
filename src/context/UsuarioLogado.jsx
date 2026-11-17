import { createContext, useContext, useEffect, useState } from "react";
import { observarUsuario } from "../services/autenticacao";




const UsuarioLogado = createContext({ usuario: null, carregando: true });

export function UsuarioLogadoProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const parar = observarUsuario((dados) => {
            setUsuario(dados);
            setCarregando(false);
        });
        return parar;
    }, []);

    return <UsuarioLogado.Provider value={{ usuario, carregando }}>{children}</UsuarioLogado.Provider>;
}

export function useUsuarioLogado(){
    return useContext(UsuarioLogado);
}



export function areaDoUsuario(usuario){
    if(!usuario) return "/login";
    return usuario.perfil === "professor" ? "/professor" : "/aluno";
}