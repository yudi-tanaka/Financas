import { useState, useEffect } from "react"
import { getRelatorioPorCategoria, type RelatorioPorCategoria } from "../../services/Relatorio"

import Breadcrumbs from "../../components/Breadcrumbs"


export default function PorCategoria(){
    const [relatorio, setRelatorio] = useState<RelatorioPorCategoria | null>(null);

    useEffect(() => {
        getRelatorioPorCategoria().then(setRelatorio);
    }, [])


    return(
        <div>
            <Breadcrumbs
              items={[
                { label: 'Home', to: '/' },
                { label: 'Relatório Por Categoria' }
              ]}
            />

            <h1>Relatório por Categoria</h1>

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
                    {relatorio?.categorias.map(item => (
                        <tr key={item.categoriaId}>
                            <td>{item.descricao}</td>
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