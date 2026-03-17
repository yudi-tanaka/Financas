import { useState, useEffect } from "react"
import { getRelatorioPorCategoria, type RelatorioPorCategoria } from "../../services/Relatorio"
import * as S from "../../style/style"

import Breadcrumbs from "../../components/Breadcrumbs"


export default function PorCategoria(){
    const [relatorio, setRelatorio] = useState<RelatorioPorCategoria | null>(null);

    useEffect(() => {
        getRelatorioPorCategoria().then(setRelatorio);
    }, [])


    return(
        <S.Container>
            <Breadcrumbs
              items={[
                { label: 'Home', to: '/' },
                { label: 'Relatório Por Categoria' }
              ]}
            />

            <S.Title>Relatório por Categoria</S.Title>

            <S.Table>
                <thead style={{backgroundColor: "#d4d4d4"}}>
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

                    <tr style={{backgroundColor: "#91D06C"}}>
                        <td><strong>Total Geral</strong></td>
                        <td><strong>{relatorio?.totalGeral.totalReceita.toFixed(2)}</strong></td>
                        <td><strong>{relatorio?.totalGeral.totalDespesa.toFixed(2)}</strong></td>
                        <td><strong>{relatorio?.totalGeral.saldo.toFixed(2)}</strong></td>
                    </tr>
                </tbody>
            </S.Table>
        </S.Container>
    )
}