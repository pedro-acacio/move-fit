import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { auth, banco } from "./firebase";

// Histórico de treinos concluídos (RF16.1, RF17, RF18).
// Cada conclusão vira um documento na coleção "historico". O professorId fica salvo
// para o Dashboard do professor contar a constância dos alunos dele.

// Meta semanal padrão para todos os alunos.
export const META_SEMANAL = 3;

const DIAS = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

function colecaoHistorico() {
    return collection(banco, "historico");
}

// Logo depois de gravar, o serverTimestamp ainda não voltou do servidor (fica null por um instante).
// Nesse caso usamos a data de agora.
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
        aoMudar(lista.sort((a, b) => dataDe(b) - dataDe(a))); // mais recente primeiro
    });
}

// Histórico de todos os alunos do professor logado (Dashboard e Detalhes do aluno, RF12 e RF13).
export function observarHistoricoDoProfessor(aoMudar) {
    const consulta = query(colecaoHistorico(), where("professorId", "==", auth.currentUser.uid));

    return onSnapshot(consulta, (resultado) => {
        const lista = resultado.docs.map((documento) => ({ id: documento.id, ...documento.data() }));
        aoMudar(lista.sort((a, b) => dataDe(b) - dataDe(a))); // mais recente primeiro
    });
}

// Segunda-feira desta semana, à meia-noite.
function inicioDaSemana() {
    const data = new Date();
    data.setHours(0, 0, 0, 0);
    const diasDesdeSegunda = (data.getDay() + 6) % 7;
    data.setDate(data.getDate() - diasDesdeSegunda);
    return data;
}

// Dias diferentes com treino nesta semana (a meta é de dias treinados).
// Dois treinos no mesmo dia contam como um só.
export function contarNaSemana(historico) {
    const inicio = inicioDaSemana();
    const dias = historico
        .filter((item) => dataDe(item) >= inicio)
        .map((item) => dataDe(item).toDateString()); // ex.: "Sun Nov 15 2026"
    return new Set(dias).size; // o Set guarda cada dia uma vez só
}

// true se o aluno já concluiu este treino hoje (evita concluir o mesmo treino várias vezes).
export function concluiuHoje(historico, treinoId) {
    const inicio = new Date();
    inicio.setHours(0, 0, 0, 0);
    return historico.some((item) => item.treinoId === treinoId && dataDe(item) >= inicio);
}

// Quantos treinos foram concluídos hoje (a partir da meia-noite).
export function contarHoje(historico) {
    const inicio = new Date();
    inicio.setHours(0, 0, 0, 0);
    return historico.filter((item) => dataDe(item) >= inicio).length;
}

// "Hoje", "Ontem" ou "Quarta-feira, 12/11".
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
