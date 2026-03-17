import { Link } from 'react-router-dom'

export type BreadcrumbItem = {
  label: string
  to?: string
}

type Props = {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="breadcrumb" style={{ marginBottom: 16 }}>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: 8 }}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.label} style={{ display: 'flex', alignItems: 'center' }}>
              {item.to && !isLast ? (
                <Link to={item.to} style={{ textDecoration: 'none', color: '#1976d2' }}>
                  {item.label}
                </Link>
              ) : (
                <span style={{ color: isLast ? '#000' : '#555' }}>{item.label}</span>
              )}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
