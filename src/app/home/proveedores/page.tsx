import ProveedoresTable from '@/components/table/ProveedoresTable'
import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Proveedores',
  description: 'Proveedores',
  keywords: 'Proveedores',
}

export default function Proveedores() {
  return (
    <section className="px-6 py-4">
      <ProveedoresTable />
    </section>
  )
}
