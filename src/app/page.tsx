import Sidebar from '@/components/Sidebar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard'
}

export default function Home() {
  return (
    <main className="min-h-screen md:grid md:grid-cols-[auto_1fr]">
      <Sidebar />
      <section>
        <h2>xd</h2>
      </section>
    </main>
  )
}
