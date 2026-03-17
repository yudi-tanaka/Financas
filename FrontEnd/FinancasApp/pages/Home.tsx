import { useNavigate } from 'react-router-dom'
import * as S from '../style/style'
import { FaUsers , FaUser, FaTags , FaTag, FaExchangeAlt   } from 'react-icons/fa'


export default function Home() {
    const navigate = useNavigate();

    function goTo(page: string) {
        navigate(`/${page}`);
    }

    return (
        <S.Container>
            <S.Title>Finanças</S.Title>

            <S.Subtitle>Cadastros</S.Subtitle>
            <S.Grid>
                <S.Card onClick={() => goTo('Pessoa')}>
                    <S.Icon><FaUsers  /></S.Icon>
                    <S.Text>Pessoas</S.Text>
                </S.Card>
                <S.Card onClick={() => goTo('Categoria')}>
                    <S.Icon><FaTags /></S.Icon>
                    <S.Text>Categorias</S.Text>
                </S.Card>
                <S.Card onClick={() => goTo('Transacao')}>
                    <S.Icon><FaExchangeAlt /></S.Icon>
                    <S.Text>Transações</S.Text>
                </S.Card>
            </S.Grid>

            <S.Subtitle>Relatórios</S.Subtitle>

            <S.Grid>
                <S.Card onClick={() => goTo('Relatorio/porpessoa')}>
                    <S.Icon><FaUser  /></S.Icon>
                    <S.Text>Relatório por Pessoa</S.Text>
                </S.Card>
                <S.Card onClick={() => goTo('Relatorio/porcategoria')}>
                    <S.Icon><FaTag /></S.Icon>
                    <S.Text>Relatório por Categoria</S.Text>
                </S.Card>
            </S.Grid>

        </S.Container>
    )
}
