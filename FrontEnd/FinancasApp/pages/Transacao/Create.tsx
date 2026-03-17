import {useState, useEffect} from 'react'
import { postTransacao, type Transacao} from '../../services/Transacao'
import { getPessoas, type Pessoa } from '../../services/Pessoa'
import { getCategorias, type Categoria } from '../../services/Categoria'
import Breadcrumbs from '../../components/Breadcrumbs'


export default function Create(){
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState(0);
    const [tipo, setTipo] = useState<'Despesa' | 'Receita'>('Despesa');
    const [categoria, setCategoria] = useState('');
    const [pessoaId, setPessoaId] = useState(0);
    
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriasFiltradas, setCategoriasFiltradas] = useState<Categoria[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pessoaMenorDeIdade, setPessoaMenorDeIdade] = useState(false);

    useEffect(() => {
        getPessoas().then(setPessoas);
        getCategorias().then(setCategorias);
    }, []);


    useEffect(() => {
        const filtradas = categorias.filter((cat) => cat.finalidade === tipo)
        setCategoriasFiltradas(filtradas)
    }, [tipo, categorias])

    useEffect(() => {
        const pessoaSelecionada = pessoas.find(p => p.id === pessoaId);
        if(pessoaSelecionada && pessoaSelecionada.idade < 18){
            setTipo('Despesa');
            setPessoaMenorDeIdade(true);
        }
        else{
            setPessoaMenorDeIdade(false);
        }
    }, [pessoaId, pessoas])



    async function handleSubmit(event: React.FormEvent){
        event.preventDefault();
        try{
            setLoading(true);
            setError(null);

            const novaTransacao: Transacao = {
                id: 0, // O ID será atribuído pelo backend
                descricao,
                valor,
                tipo,
                categoria,
                pessoaId
            }

            await postTransacao(novaTransacao);

            alert('Transação criada com sucesso!');

            setLoading(false);
            setPessoaMenorDeIdade(false);

            setDescricao('');
            setValor(0);
            setTipo('Despesa');
            setCategoria('');
            setPessoaId(0);
        }
        catch(error : any){
            console.error('Erro ao criar transação:', error);
            setError('Erro ao criar transação');
            setLoading(false);
            setPessoaMenorDeIdade(false);
        }
    }

    return (
        <div>
            <Breadcrumbs
              items={[
                { label: 'Home', to: '/' },
                { label: 'Transações', to: '/transacao' },
                { label: 'Nova Transação'}
              ]}
            />
            <h1>Nova Transação</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="descricao">Descrição:</label>
                    <input
                        id="descricao"
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="valor">Valor:</label>
                    <input
                        id="valor"
                        type="number"
                        step="0.01"
                        value={valor}
                        onChange={(e) => setValor(parseFloat(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="tipo">Tipo:</label>
                    <select
                        id="tipo"
                        value={tipo}
                        onChange={(e) => {
                            setTipo(e.target.value as 'Despesa' | 'Receita');
                        }}
                        required
                        disabled={pessoaMenorDeIdade}
                    >
                        <option value="Despesa">Despesa</option>
                        <option value="Receita">Receita</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="categoria">Categoria:</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                    >
                        <option value="">Selecione uma categoria</option>
                        {categoriasFiltradas.map((cat) => (
                            <option key={cat.id} value={cat.descricao}>
                                {cat.descricao}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="pessoaId">Pessoa:</label>
                    <select
                        id="pessoaId"
                        value={pessoaId}
                        onChange={(e) => setPessoaId(parseInt(e.target.value))}
                        required
                    >
                        <option value={0}>Selecione uma pessoa</option>
                        {pessoas.map((pessoa) => (
                            <option key={pessoa.id} value={pessoa.id}>
                                {pessoa.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    Obs: Menores de 18 anos só podem criar despesas.
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar'}
                </button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    )
}