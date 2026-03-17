import {api} from './api'

export type Categoria = {
    id: number,
    descricao: string,
    finalidade: 'Despesa' | 'Receita'
}

export async function getCategorias(): Promise<Categoria[]> {
    return api<Categoria[]>('categoria', 'GET');
}

export async function postCategoria(categoria: Categoria): Promise<Categoria> {
    return api<Categoria>('categoria', 'POST', categoria);
}