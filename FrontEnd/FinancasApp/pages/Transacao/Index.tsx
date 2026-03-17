import { useState, useEffect } from 'react'
import {getTransacoes, type Transacao} from '../../services/Transacao'
import { useNavigate } from 'react-router-dom'
import * as S from '../../style/style'

import Breadcrumbs from '../../components/Breadcrumbs'


export default function Transacao() {
  const[transacoes, setTransacoes] = useState<Transacao[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTransacoes().then(setTransacoes);
  }, []);



  return (
    <S.Container>
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Transações' },
          ]}
        />

      <S.Title>Transações</S.Title>

      <S.Button style={{marginBottom: 10}} onClick={() => navigate('/transacao/create')}>Nova Transação</S.Button>
      <S.Table>
        <thead style={{backgroundColor: "#d4d4d4"}}>
            <tr>
                
                <th>Descricao</th>
                <th>Valor</th>
                <th>Tipo</th>
                <th>Categoria</th>
            </tr>
        </thead>
        <tbody>
          {transacoes.map((transacao) => (
            <tr key={transacao.id}>
              
              <td>{transacao.descricao}</td>
              <td>{transacao.valor}</td>
              <td>{transacao.tipo}</td>
              <td>{transacao.categoria}</td>              
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.Container>  
  )
}