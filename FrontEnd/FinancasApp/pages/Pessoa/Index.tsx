import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs'
import * as S from '../../style/style'


import {
    getPessoas,
    deletePessoa, 
    type Pessoa
} 
from '../../services/Pessoa'

export default function Pessoa(){
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); 

    useEffect(() => {
        getPessoas().then(setPessoas);
    }, []);

    async function deletarPessoa(id: number){
        if (!window.confirm('Tem certeza que deseja excluir esta pessoa?')) {
            return;
        }

        try{
            setLoading(true);
            await deletePessoa(id);
            setPessoas(prev => prev.filter(p => p.id !== id));
            setLoading(false);
            alert('Pessoa excluída com sucesso!');
        }
        catch(error: any){
            console.error('Erro ao excluir pessoa:', error);
            setLoading(false);
            alert('Erro ao excluir pessoa. Por favor, tente novamente.');
        }
    }

    return(

        <S.Container>
            <Breadcrumbs
              items={[
                { label: 'Home', to: '/' },
                { label: 'Pessoas' },
              ]}
            />
            <S.Title>Pessoas</S.Title>

            <S.Button style={{marginBottom: 10}} onClick={() => navigate('/pessoa/create')}>Nova Pessoa</S.Button>
            
            <S.Table>
                <thead style={{backgroundColor: "#d4d4d4"}}>
                    <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pessoas.map(pessoa => (
                        <tr key={pessoa.id}>
                            <td>{pessoa.nome}</td>
                            <td>{pessoa.idade}</td>
                            <td>
                                <S.DisplayFlex>
                                    <S.Button onClick={() => navigate(`/pessoa/update/${pessoa.id}`)}>Editar</S.Button>
                                    <S.Button style={{backgroundColor: 'red'}} onClick={() => deletarPessoa(pessoa.id)} disabled={loading}>
                                        {loading ? 'Deletando...' : 'Deletar'}
                                    </S.Button>
                                </S.DisplayFlex>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </S.Table>
        </S.Container>
    )
}