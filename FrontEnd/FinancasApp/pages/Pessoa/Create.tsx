import { useState } from 'react'
import { postPessoa, type Pessoa} from '../../services/Pessoa'
import Breadcrumbs from '../../components/Breadcrumbs'

export default function Create() {
    const [nome, setNome] = useState('')
    const [idade, setIdade] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
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
        <div>
            <Breadcrumbs
              items={[
                { label: 'Home', to: '/' },
                { label: 'Pessoas', to: '/pessoa' },
                { label: 'Criar Pessoa' },
              ]}
            />
            <h1>Criar Pessoa</h1>

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