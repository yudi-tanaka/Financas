import { useState } from 'react'
import { postCategoria, type Categoria} from '../../services/Categoria'
import Breadcrumbs from '../../components/Breadcrumbs'
import * as S from '../../style/style'

export default function Create() {
    const [descricao, setDescricao] = useState('');
    const [finalidade, setFinalidade] = useState<'Despesa' | 'Receita'>('Despesa');    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if([descricao, finalidade].some(field => field === '')){
            setError('Todos os campos são obrigatórios');
            return; 
        }

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
    <S.Container>
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Categorias', to: '/categoria' },
            { label: 'Nova Categoria' },
          ]}
        />
        <S.Title>Nova Categoria</S.Title>
        <form onSubmit={handleSubmit}>
            <div>
                <S.Label htmlFor="descricao">Descrição:</S.Label>
                <S.Input type="text" id="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} required />
            </div>
            <div>
                <S.Label htmlFor="finalidade">Finalidade:</S.Label>
                <S.Select id="finalidade" value={finalidade} onChange={e => setFinalidade(e.target.value as 'Despesa' | 'Receita')} required>
                    <option value="Despesa">Despesa</option>
                    <option value="Receita">Receita</option>
                </S.Select>
            </div>

            <S.Button type="submit" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
            </S.Button>

            {error && <S.ErrorMessage>Erro: {error}</S.ErrorMessage>}
        </form>
    </S.Container>
  )
}