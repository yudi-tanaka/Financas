import { useState } from 'react'
import { postCategoria, type Categoria} from '../../services/Categoria'
import Breadcrumbs from '../../components/Breadcrumbs'

export default function Create() {
    const [descricao, setDescricao] = useState('');
    const [finalidade, setFinalidade] = useState<'Despesa' | 'Receita'>('Despesa');    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        try {
        
            setLoading(true);
            setError(null);

            const novaCategoria: Categoria = {
                id: 0, // O ID será atribuído pelo backend
                descricao,
                finalidade
            };

            await postCategoria(novaCategoria);

            alert('Categoria criada com sucesso!');
            
            setDescricao('');
            setFinalidade('Despesa');
        } catch (error: any) {
            console.error('Erro ao criar categoria:', error);
            setError('Erro ao criar categoria');
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <div>
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Categorias', to: '/categoria' },
            { label: 'Nova Categoria' },
          ]}
        />
        <h1>Nova Categoria</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Descrição:</label>
                <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} required />
            </div>
            <div>
                <label>Finalidade:</label>
                <select value={finalidade} onChange={e => setFinalidade(e.target.value as 'Despesa' | 'Receita')} required>
                    <option value="Despesa">Despesa</option>
                    <option value="Receita">Receita</option>
                </select>
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
            </button>

            {error && <p style={{color: 'red'}}>Erro: {error}</p>}
        </form>
    </div>
  )
}