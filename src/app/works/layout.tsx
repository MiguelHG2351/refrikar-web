import Sidebar from '@/components/drawer-menu/Sidebar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard'
}

export default function LayoutWork({
  children
}: {
  children: React.ReactNode
}){
  return (
    <main className="min-h-screen md:grid md:grid-cols-[auto_1fr]">
      <Sidebar />
      <div>
        { children }
      </div>
    </main>
  )
}
