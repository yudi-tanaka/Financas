import { useState, useEffect } from 'react'
import { putPessoa, getPessoa, type Pessoa} from '../../services/Pessoa'
import Breadcrumbs from '../../components/Breadcrumbs'
import { useParams } from 'react-router-dom'
import * as S from '../../style/style'

export default function Update () {
    const { pessoaId } = useParams<{pessoaId: string}>();
    const _pessoaId = Number(pessoaId);


    const [nome, setNome] = useState('')
    const [idade, setIdade] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getPessoa(_pessoaId).then(pessoa => {
            setNome(pessoa.nome);
            setIdade(pessoa.idade);
        })
    }, []);

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
                id: _pessoaId, // O ID será atribuído pelo backend
                nome,
                idade
            };

            await putPessoa(novaPessoa);

            alert('Pessoa atualizada com sucesso!');
        }
        catch (error: any) {
            console.error('Erro ao atualizar pessoa:', error);
            setError('Erro ao atualizar pessoa');
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
                { label: 'Editar Pessoa' },
              ]}
            />
            <S.Title>Editar Pessoa</S.Title>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <S.Input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
                </div>
                <div>
                    <label>Idade:</label>
                    <S.Input type="number" value={idade} onChange={e => setIdade(Number(e.target.value))} required />

                </div>
                <S.Button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar'}
                </S.Button>
                {error && <S.ErrorMessage>Erro: {error}</S.ErrorMessage>}
            </form>
        </S.Container>
    )
}