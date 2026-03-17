import {api} from './api'

export type Pessoa = {
    id: number,
    nome: string,
    idade: number
}

export async function getPessoas(): Promise<Pessoa[]> {
    return api<Pessoa[]>('pessoa', 'GET');
}

export async function getPessoa(id: number): Promise<Pessoa>{
    return api<Pessoa>("pessoa/" + id, "GET");
}

export async function postPessoa(pessoa: Pessoa): Promise<Pessoa> {
    return api<Pessoa>('pessoa', 'POST', pessoa);
}

export async function putPessoa (pessoa: Pessoa): Promise<Pessoa>{
    return api<Pessoa>("pessoa/" + pessoa.id, "PUT", pessoa);
}

export async function deletePessoa(id: number) : Promise<void>{
    return api<void>("pessoa/" + id, "DELETE");
}