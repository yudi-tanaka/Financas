import {api} from "./api"

export type Transacao = {
    id: number,
    descricao: string,
    valor: number,
    tipo: 'Despesa' | 'Receita',
    categoria: string,
    pessoaId: number
}

export async function getTransacoes(): Promise<Transacao[]> {
    return api<Transacao[]>('transacao', 'GET');
}

export async function postTransacao(transacao: Transacao): Promise<Transacao> {
    return api<Transacao>('transacao', 'POST', transacao);
}