import { useState, useEffect } from 'react'
import {getTransacoes, type Transacao} from '../../services/Transacao'
import { useNavigate } from 'react-router-dom'

import Breadcrumbs from '../../components/Breadcrumbs'


export default function Transacao() {
  const[transacoes, setTransacoes] = useState<Transacao[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTransacoes().then(setTransacoes);
  }, []);



  return (
    <div>
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Transações' },
          ]}
        />

      <h1>Transações</h1>

      <button onClick={() => navigate('/transacao/create')}>Nova Transação</button>
      <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Descricao</th>
                <th>Valor</th>
                <th>Tipo</th>
                <th>Categoria</th>
            </tr>
        </thead>
        <tbody>
          {transacoes.map((transacao) => (
            <tr key={transacao.id}>
              <td>{transacao.id}</td>
              <td>{transacao.descricao}</td>
              <td>{transacao.valor}</td>
              <td>{transacao.tipo}</td>
              <td>{transacao.categoria}</td>              
            </tr>
          ))}
        </tbody>
      </table>
    </div>  
  )
}