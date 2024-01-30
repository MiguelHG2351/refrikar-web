import Sidebar from '@/presentation/components/Sidebar'
import { Metadata } from 'next'
import Image from 'next/image'

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
