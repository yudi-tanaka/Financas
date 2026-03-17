import {api} from './api'

export type TotalGeral ={
    totalReceita: number,
    totalDespesa: number,
    saldo : number
}

export type PessoaTotal ={
    pessoaId: number,
    nome: string,
    totalReceita: number,
    totalDespesa: number,
    saldo: number
}

export type CategoriaTotal = {
    categoriaId: number,
    descricao: string,
    totalReceita: number,
    totalDespesa: number,
    saldo: number
}

export type RelatorioPorPessoa = {
    pessoas: PessoaTotal[],
    totalGeral: TotalGeral
}


export type RelatorioPorCategoria = {
    categorias: CategoriaTotal[],
    totalGeral: TotalGeral
}

export async function getRelatorioPorPessoa(): Promise<RelatorioPorPessoa> {
    return api<RelatorioPorPessoa>('Relatorios/PorPessoa', 'GET');
}

export async function getRelatorioPorCategoria(): Promise<RelatorioPorCategoria> {
    return api<RelatorioPorCategoria>('Relatorios/PorCategoria', 'GET');
}
    
