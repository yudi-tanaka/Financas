import { useState, useEffect } from 'react'
import {getCategorias, type Categoria} from '../../services/Categoria'
import { useNavigate } from 'react-router-dom'

//import breadcrumbs
import Breadcrumbs from '../../components/Breadcrumbs'


export default function Categoria() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        getCategorias().then(setCategorias);
    }, []);


  return (
    <div>
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Categorias' },
          ]}
        />

      <h1>Categorias</h1>
      <button onClick={() => navigate('/categoria/create')}>Nova Categoria</button>
      <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Descrição</th>
                <th>Finalidade</th>
            </tr>
        </thead>
        <tbody>
            {categorias.map(categoria => (
                <tr key={categoria.id}>
                    <td>{categoria.id}</td>
                    <td>{categoria.descricao}</td>
                    <td>{categoria.finalidade}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>  
  )
}