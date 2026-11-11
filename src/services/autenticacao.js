import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { auth, banco } from "./firebase";

// Tudo sobre a conta do usuário: cadastro, login, sair e recuperar senha (RF02, RF03).
// O perfil de cada usuário fica na coleção "usuarios", no documento com o mesmo id da conta (uid).

// Gera um código de 4 dígitos que nenhum outro usuário tenha (RF03.1).

async function gerarCodigoUnico() {
    let codigo;
    let repetido;

    do {
        codigo = String(Math.floor(1000 + Math.random() * 9000));
        const iguais = await getDocs(query(collection(banco, "usuarios"), 
        where("codigo", "==",codigo)));
        repetido = !iguais.empty;
    } while (repetido);
    return codigo;
}

async function buscarUsuario(uid) {
    const documento = await getDoc(doc(banco,"usuarios", uid));
    return documento.exists() ? documento.data() : null;
}

export async function cadastrar({nome, email, senha,perfil,cref}){
    const {user} = await createUserWithEmailAndPassword(auth,email,senha);
    const codigo = await gerarCodigoUnico();

    const usuario = {nome,email,perfil,codigo, criadoEm: serverTimestamp()};
    
    if(perfil === "professor"){
        usuario.cref = cref;
    }
    await setDoc(doc(banco, "usuarios",user.uid),usuario);
    return usuario;
}

export async function entrar(email,senha) {
    const {user} = await signInWithEmailAndPassword(auth, email,senha);
    return buscarUsuario(user.uid);
}

export function sair(){
    return signOut(auth);
}

export function recuperarSenha(email){
    return sendPasswordResetEmail(auth,email);
}

// Dados de quem está logado agora (null se ninguém estiver).
export function buscarUsuarioLogado(){
    const atual = auth.currentUser;
    return atual ? buscarUsuario(atual.uid) : Promise.resolve(null);
}

// O Firebase devolve erros em inglês, com um código. Aqui viram mensagens em português.
const MENSAGENS = {
  "auth/invalid-credential": "E-mail ou senha incorretos.",
  "auth/wrong-password": "E-mail ou senha incorretos.",
  "auth/user-not-found": "E-mail ou senha incorretos.",
  "auth/invalid-email": "E-mail inválido.",
  "auth/email-already-in-use": "Este e-mail já está cadastrado.",
  "auth/weak-password": "A senha precisa ter pelo menos 8 caracteres.",
  "auth/network-request-failed": "Sem conexão com a internet. Tente de novo.",
  "auth/too-many-requests": "Muitas tentativas. Aguarde um pouco e tente de novo.",
};

export function mensagemDeErro(erro) {
  return MENSAGENS[erro.code] ?? "Algo deu errado. Tente de novo.";
}