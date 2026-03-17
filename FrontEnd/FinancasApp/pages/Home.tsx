import { useNavigate } from 'react-router-dom'


export default function Home() {
    const navigate = useNavigate();

    function goTo(page: string) {
        navigate(`/${page}`);
    }

    return (
        <div>
            <h1>Finanças</h1>
            <button onClick={() => goTo('Pessoa')}>Pessoas</button>
            <button onClick={() => goTo('Categoria')}>Categorias</button>
            <button onClick={() => goTo('Transacao')}>Transações</button>
            <button onClick={() => goTo('Relatorio/porpessoa')}>Relatório por Pessoa</button>
            <button onClick={() => goTo('Relatorio/porcategoria')}>Relatório por Categoria</button>
        </div>
    )
}