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
          <div className="inline-flex items-center cursor-pointer">
            <div className="inline-block rounded-full bg-primary overflow-hidden">
              <Image src="/images/user-profile.png" alt="Foto de perfil del usuario" width={42} height={42} />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="37" viewBox="0 0 36 37" fill="none">
              <g clipPath="url(#clip0_70_4708)">
                <path fillRule="evenodd" clipRule="evenodd" d="M19.59 24.59C19.1681 25.0114 18.5962 25.248 18 25.248C17.4037 25.248 16.8318 25.0114 16.41 24.59L7.92297 16.106C7.50108 15.6839 7.26414 15.1115 7.26428 14.5147C7.26442 13.9179 7.50163 13.3457 7.92372 12.9238C8.34581 12.5019 8.91822 12.2649 9.515 12.2651C10.1118 12.2652 10.6841 12.5024 11.106 12.9245L18 19.8185L24.894 12.9245C25.3181 12.5145 25.8864 12.2874 26.4763 12.2922C27.0663 12.2971 27.6307 12.5335 28.0481 12.9504C28.4655 13.3674 28.7024 13.9316 28.7078 14.5216C28.7132 15.1115 28.4866 15.68 28.077 16.1045L19.5915 24.5915L19.59 24.59Z" fill="black"/>
              </g>
              <defs>
                <clipPath id="clip0_70_4708">
                  <rect width="36" height="36" fill="white" transform="translate(0 0.5)"/>
                </clipPath>
              </defs>
            </svg>
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
