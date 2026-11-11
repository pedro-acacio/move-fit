import { createContext, useContext, useEffect, useState } from "react";
import { observarUsuario } from "../services/autenticacao";

// Usuário logado, compartilhado com o app inteiro.
// "carregando" fica true só no começo, enquanto o Firebase confere se já existe uma sessão salva.

const UsuarioLogado = createContext({ usuario: null, carregando: true });

export function UsuarioLogadoProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const parar = observarUsuario((dados) => {
            setUsuario(dados);
            setCarregando(false);
        });
        return parar; // desliga o vigia se o app fechar
    }, []);

    return <UsuarioLogado.Provider value={{ usuario, carregando }}>{children}</UsuarioLogado.Provider>;
}

export function useUsuarioLogado(){
    return useContext(UsuarioLogado);
}

// Endereço da área de cada usuário: quem não está logado vai para o Login.

export function areaDoUsuario(usuario){
    if(!usuario) return "/login";
    return usuario.perfil === "professor" ? "/professor" : "/aluno";
}