import { useState } from 'react'
import { postPessoa, type Pessoa} from '../../services/Pessoa'
import Breadcrumbs from '../../components/Breadcrumbs'

import * as S from '../../style/style'

export default function Create() {
    const [nome, setNome] = useState('')
    const [idade, setIdade] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        if(idade <= 0 || idade >= 150){
            setError('A idade deve ser um número entre 1 e 150');
            return;
        }

        if([nome, idade].some(field => field === '' || field === 0)){
            setError('Todos os campos são obrigatórios');
            return;
        }


        try {
            setLoading(true);
            setError(null);

            const novaPessoa: Pessoa = {
                id: 0, // O ID será atribuído pelo backend
                nome,
                idade
            };

            await postPessoa(novaPessoa);

            alert('Pessoa criada com sucesso!');

            setNome('');
            setIdade(0);
        }
        catch (error: any) {
            console.error('Erro ao criar pessoa:', error)
            setError('Erro ao criar pessoa')
        }
        finally{
            setLoading(false)
        }
    }


    return(
        <S.Container>
            <Breadcrumbs
              items={[
                { label: 'Home', to: '/' },
                { label: 'Pessoas', to: '/pessoa' },
                { label: 'Nova Pessoa' },
              ]}
            />
            <S.Title>Nova Pessoa</S.Title>

            <form onSubmit={handleSubmit}>
                <div>
                    <S.Label htmlFor="nome">Nome:</S.Label>
                    <S.Input type="text" id="nome" value={nome} onChange={e => setNome(e.target.value)} required />
                </div>
                <div>
                    <S.Label htmlFor="idade">Idade:</S.Label>
                    <S.Input type="number" id="idade" value={idade} onChange={e => setIdade(Number(e.target.value))} required />
                </div>
                <S.Button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar'}
                </S.Button>
                {error && <S.ErrorMessage>Erro: {error}</S.ErrorMessage>}
            </form>
        </S.Container>
    )
}