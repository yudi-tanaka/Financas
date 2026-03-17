import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from '../pages/Home'
import Pessoa from '../pages/Pessoa/Index'
import PessoaCreate from '../pages/Pessoa/Create'
import PessoaUpdate from '../pages/Pessoa/Update'

import Categoria from '../pages/Categoria'
import CategoriaCreate from '../pages/Categoria/Create'

import Transacao from '../pages/Transacao/Index'
import TransacaoCreate from '../pages/Transacao/Create'

import RelatorioPorPessoa from '../pages/Relatorio/PorPessoa'
import RelatorioPorCategoria from '../pages/Relatorio/PorCategoria'


function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/pessoa" element={<Pessoa />} />
        <Route path="/pessoa/create" element={<PessoaCreate />} />
        <Route path="/pessoa/update/:pessoaId" element={<PessoaUpdate />} />
        
        <Route path="/categoria" element={<Categoria />} />
        <Route path="/categoria/create" element={<CategoriaCreate />} />

        <Route path="/transacao" element={<Transacao />} />
        <Route path="/transacao/create" element={<TransacaoCreate />} />
        
        <Route path="/relatorio/porpessoa" element={<RelatorioPorPessoa />} />
        <Route path="/relatorio/porcategoria" element={<RelatorioPorCategoria />} />
      </Routes>
    
    </BrowserRouter>
  )

}

export default App
