import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs'


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

        <div>
            <Breadcrumbs
              items={[
                { label: 'Home', to: '/' },
                { label: 'Pessoas' },
              ]}
            />
            <h1>Pessoas</h1>

            <button onClick={() => navigate('/pessoa/create')}>Nova Pessoa</button>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pessoas.map(pessoa => (
                        <tr key={pessoa.id}>
                            <td>{pessoa.id}</td>
                            <td>{pessoa.nome}</td>
                            <td>{pessoa.idade}</td>
                            <td>
                                <button onClick={() => navigate(`/pessoa/update/${pessoa.id}`)}>Editar</button>
                                <button onClick={() => deletarPessoa(pessoa.id)} disabled={loading}>
                                    {loading ? 'Deletando...' : 'Deletar'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}