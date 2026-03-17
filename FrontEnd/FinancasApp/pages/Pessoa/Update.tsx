import { useState, useEffect } from 'react'
import { putPessoa, getPessoa, type Pessoa} from '../../services/Pessoa'
import Breadcrumbs from '../../components/Breadcrumbs'
import { useParams } from 'react-router-dom'

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
        <div>
            <Breadcrumbs
              items={[
                { label: 'Home', to: '/' },
                { label: 'Pessoas', to: '/pessoa' },
                { label: 'Atualizar Pessoa' },
              ]}
            />
            <h1>Atualizar Pessoa</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
                </div>
                <div>
                    <label>Idade:</label>
                    <input type="number" value={idade} onChange={e => setIdade(Number(e.target.value))} required />

                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar'}
                </button>
                {error && <p style={{color: 'red'}}>Erro: {error}</p>}
            </form>
        </div>
    )
}