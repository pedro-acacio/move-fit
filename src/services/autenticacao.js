import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { auth, banco } from "./firebase";






async function gerarCodigoUnico() {
    let codigo;
    let repetido;

    do {
        codigo = String(Math.floor(1000 + Math.random() * 9000));
        const iguais = await getDocs(query(collection(banco, "usuarios"),
            where("codigo", "==", codigo)));
        repetido = !iguais.empty;
    } while (repetido);
    return codigo;
}

async function buscarUsuario(uid) {
    const documento = await getDoc(doc(banco, "usuarios", uid));
    return documento.exists() ? documento.data() : null;
}

export async function cadastrar({ nome, email, senha, perfil, cref, aceitouTermos }) {

    if (!aceitouTermos) {
        throw { code: "termos-nao-aceitos" };
    }
    const { user } = await createUserWithEmailAndPassword(auth, email, senha);
    const codigo = await gerarCodigoUnico();


    const usuario = {
        nome,
        email,
        perfil,
        codigo,
        criadoEm: serverTimestamp(),
        termosAceitosEm: serverTimestamp(),
    };

    if (perfil === "professor") {
        usuario.cref = cref;
    }
    await setDoc(doc(banco, "usuarios", user.uid), usuario);
    return usuario;
}

export async function entrar(email, senha) {
    const { user } = await signInWithEmailAndPassword(auth, email, senha);
    return buscarUsuario(user.uid);
}

export function sair() {
    return signOut(auth);
}

export function recuperarSenha(email) {
    return sendPasswordResetEmail(auth, email);
}



export function observarUsuario(aoMudar) {
    let pararPerfil = () => { };

    const pararConta = onAuthStateChanged(auth, (conta) => {
        pararPerfil();

        if (!conta) {
            pararPerfil = () => { };
            aoMudar(null);
            return;
        }

        pararPerfil = onSnapshot(doc(banco, "usuarios", conta.uid), (documento) => {

            aoMudar(documento.exists() ? { uid: conta.uid, ...documento.data() } : null);
        });
    });
    return () => {
        pararPerfil();
        pararConta();
    };
}


const MENSAGENS = {
    "auth/requires-recent-login": "Por segurança, saia e entre de novo antes de apagar a conta.",
    "permission-denied": "O Firebase não permitiu apagar os seus dados. Fale com a equipe do projeto.",
    "termos-nao-aceitos": "Para criar a conta, aceite os Termos de Uso.",
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