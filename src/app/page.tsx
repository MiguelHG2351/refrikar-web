import Sidebar from '@/components/drawer-menu/Sidebar'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Dashboard'
}

export default function Home() {
  return (
    <main className="min-h-screen md:grid md:grid-cols-[auto_1fr]">
      <Sidebar />
      <section className="bg-accent-1">
        <header className="flex justify-between items-center py-2 px-4 border-b">
          {/* breadcrumb */}
          <div>
            <p>/Home/Dashboard</p>
          </div>
          <div className="inline-block rounded-full bg-primary overflow-hidden">
            <Image src="/images/user-profile.png" alt="Foto de perfil del usuario" width={42} height={42} />
          </div>
        </header>
        <h2>xd</h2>
        <ul className="flex flex-col">
          <li>dsasd</li>
          <li>sdfsf</li>
        </ul>
      </section>
    </main>
  )
}
