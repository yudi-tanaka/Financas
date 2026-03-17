import { useState, useEffect } from "react"
import { getRelatorioPorPessoa, type RelatorioPorPessoa } from "../../services/Relatorio"

import Breadcrumbs from "../../components/Breadcrumbs"


export default function PorPessoa(){
    const [relatorio, setRelatorio] = useState<RelatorioPorPessoa | null>(null);

    useEffect(() => {
        getRelatorioPorPessoa().then(setRelatorio);
    }, [])


    return(
        <div>
            <Breadcrumbs
              items={[
                { label: 'Home', to: '/' },
                { label: 'Relatório Por Pessoa' }
              ]}
            />

            <h1>Relatório por Pessoa</h1>

            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Total de Receitas</th>
                        <th>Total de Despesas</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {relatorio?.pessoas.map(item => (
                        <tr key={item.pessoaId}>
                            <td>{item.nome}</td>
                            <td>{item.totalReceita.toFixed(2)}</td>
                            <td>{item.totalDespesa.toFixed(2)}</td>
                            <td>{item.saldo.toFixed(2)}</td>
                        </tr>
                    ))}

                    <tr>
                        <td><strong>Total Geral</strong></td>
                        <td><strong>{relatorio?.totalGeral.totalReceita.toFixed(2)}</strong></td>
                        <td><strong>{relatorio?.totalGeral.totalDespesa.toFixed(2)}</strong></td>
                        <td><strong>{relatorio?.totalGeral.saldo.toFixed(2)}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}