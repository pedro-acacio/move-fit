import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { auth, banco } from "./firebase";






export const META_SEMANAL = 3;

const DIAS = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

function colecaoHistorico() {
    return collection(banco, "historico");
}



function dataDe(item) {
    return item.concluidoEm?.toDate() ?? new Date();
}

export function registrarConclusao(treino) {
    return addDoc(colecaoHistorico(), {
        alunoId: auth.currentUser.uid,
        alunoNome: treino.alunoNome,
        professorId: treino.professorId,
        treinoId: treino.id,
        treinoNome: treino.nome,
        exercicios: treino.exercicios.length,
        concluidoEm: serverTimestamp(),
    });
}

export function observarHistoricoDoAluno(aoMudar) {
    const consulta = query(colecaoHistorico(), where("alunoId", "==", auth.currentUser.uid));

    return onSnapshot(consulta, (resultado) => {
        const lista = resultado.docs.map((documento) => ({ id: documento.id, ...documento.data() }));
        aoMudar(lista.sort((a, b) => dataDe(b) - dataDe(a)));
    });
}


export function observarHistoricoDoProfessor(aoMudar) {
    const consulta = query(colecaoHistorico(), where("professorId", "==", auth.currentUser.uid));

    return onSnapshot(consulta, (resultado) => {
        const lista = resultado.docs.map((documento) => ({ id: documento.id, ...documento.data() }));
        aoMudar(lista.sort((a, b) => dataDe(b) - dataDe(a)));
    });
}


function inicioDaSemana() {
    const data = new Date();
    data.setHours(0, 0, 0, 0);
    const diasDesdeSegunda = (data.getDay() + 6) % 7;
    data.setDate(data.getDate() - diasDesdeSegunda);
    return data;
}



export function contarNaSemana(historico) {
    const inicio = inicioDaSemana();
    const dias = historico
        .filter((item) => dataDe(item) >= inicio)
        .map((item) => dataDe(item).toDateString());
    return new Set(dias).size;
}


export function concluiuHoje(historico, treinoId) {
    const inicio = new Date();
    inicio.setHours(0, 0, 0, 0);
    return historico.some((item) => item.treinoId === treinoId && dataDe(item) >= inicio);
}


export function contarHoje(historico) {
    const inicio = new Date();
    inicio.setHours(0, 0, 0, 0);
    return historico.filter((item) => dataDe(item) >= inicio).length;
}


export function descreverDia(item) {
    const data = dataDe(item);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dia = new Date(data);
    dia.setHours(0, 0, 0, 0);

    const diferenca = Math.round((hoje - dia) / (24 * 60 * 60 * 1000));
    if (diferenca === 0) return "Hoje";
    if (diferenca === 1) return "Ontem";

    const diaDoMes = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    return `${DIAS[data.getDay()]}, ${diaDoMes}/${mes}`;
}
