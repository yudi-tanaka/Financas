import { useState, useEffect } from 'react'
import {getCategorias, type Categoria} from '../../services/Categoria'
import { useNavigate } from 'react-router-dom'
import * as S from '../../style/style'

//import breadcrumbs
import Breadcrumbs from '../../components/Breadcrumbs'


export default function Categoria() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        getCategorias().then(setCategorias);
    }, []);


  return (
    <S.Container>
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Categorias' },
          ]}
        />

      <S.Title>Categorias</S.Title>
      <S.Button style={{marginBottom: 10}} onClick={() => navigate('/categoria/create')}>Nova Categoria</S.Button>
      <S.Table>
        <thead style={{backgroundColor: "#d4d4d4"}}>
            <tr>
                
                <th>Descrição</th>
                <th>Finalidade</th>
            </tr>
        </thead>
        <tbody>
            {categorias.map(categoria => (
                <tr key={categoria.id}>
                    
                    <td>{categoria.descricao}</td>
                    <td>{categoria.finalidade}</td>
                </tr>
            ))}
        </tbody>
      </S.Table>
    </S.Container>  
  )
}