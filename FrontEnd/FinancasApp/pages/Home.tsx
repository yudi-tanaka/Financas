import { useNavigate } from 'react-router-dom'
import * as S from '../style/style'


export default function Home() {
    const navigate = useNavigate();

    function goTo(page: string) {
        navigate(`/${page}`);
    }

    return (
        <S.Container>
            <S.Title>Finanças</S.Title>
            <S.DisplayFlex>
                <S.Button onClick={() => goTo('Pessoa')}>Pessoas</S.Button>
                <S.Button onClick={() => goTo('Categoria')}>Categorias</S.Button>
                <S.Button onClick={() => goTo('Transacao')}>Transações</S.Button>
                <S.Button onClick={() => goTo('Relatorio/porpessoa')}>Relatório por Pessoa</S.Button>
                <S.Button onClick={() => goTo('Relatorio/porcategoria')}>Relatório por Categoria</S.Button>
            </S.DisplayFlex>
        </S.Container>
    )
}
