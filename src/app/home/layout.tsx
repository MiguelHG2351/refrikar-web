'use client'

import Sidebar from "@/components/drawer-menu/Sidebar"
import Image from "next/image"
import EditUserModal from "@/components/modals/user/EditUserModal";
import { useAuth } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@nextui-org/react";
import Link from "next/link"
import {usePathname} from "next/navigation";
import capitalize from "lodash/capitalize"

export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const { signOut } = useAuth()
  const { user } = useUser()
  const pathname = usePathname()
  

  return (
    <main className="md:h-screen md:overflow-hidden md:grid md:grid-cols-[auto_1fr]">
      <Sidebar />
      <section className="bg-accent-1 overflow-y-auto">
      <header className="sticky top-0 bg-white flex justify-between items-center py-2 px-4 border-b z-50">
        <div className="flex items-center gap-x-2">
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 36 36" fill="none">
              <g clipPath="url(#clip0_310_79)">
                <path
                    d="M30 26.25C30.5778 26.2503 31.1334 26.4729 31.5516 26.8716C31.9698 27.2704 32.2185 27.8147 32.2463 28.3919C32.2741 28.969 32.0787 29.5347 31.7007 29.9718C31.3228 30.4089 30.7911 30.6837 30.216 30.7395L30 30.75H6C5.42217 30.7497 4.86661 30.5271 4.44842 30.1284C4.03023 29.7296 3.78148 29.1853 3.75371 28.6081C3.72595 28.031 3.92129 27.4653 4.29926 27.0282C4.67724 26.5911 5.20887 26.3163 5.784 26.2605L6 26.25H30ZM30 15.75C30.5967 15.75 31.169 15.9871 31.591 16.409C32.0129 16.831 32.25 17.4033 32.25 18C32.25 18.5967 32.0129 19.169 31.591 19.591C31.169 20.0129 30.5967 20.25 30 20.25H6C5.40326 20.25 4.83097 20.0129 4.40901 19.591C3.98705 19.169 3.75 18.5967 3.75 18C3.75 17.4033 3.98705 16.831 4.40901 16.409C4.83097 15.9871 5.40326 15.75 6 15.75H30ZM30 5.25C30.5967 5.25 31.169 5.48705 31.591 5.90901C32.0129 6.33097 32.25 6.90326 32.25 7.5C32.25 8.09674 32.0129 8.66903 31.591 9.09099C31.169 9.51295 30.5967 9.75 30 9.75H6C5.40326 9.75 4.83097 9.51295 4.40901 9.09099C3.98705 8.66903 3.75 8.09674 3.75 7.5C3.75 6.90326 3.98705 6.33097 4.40901 5.90901C4.83097 5.48705 5.40326 5.25 6 5.25H30Z"
                    fill="black"/>
              </g>
              <defs>
                <clipPath id="clip0_310_79">
                  <rect width="36" height="36" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
          <p>{capitalize(pathname.split('/')[2])}</p>
        </div>
        <div className="flex items-center gap-x-4">
          {
            user?.publicMetadata?.role === 'admin' && (
                <Button as={Link} href="/home/admin" className="bg-primary text-white rounded-md text-center">
                  Administracion de Usuarios
                </Button>
            )
          }
          <Dropdown>
            <DropdownTrigger>
              <div className="inline-flex items-center gap-x-2 cursor-pointer">
                <p>{user?.fullName}</p>
                <div className="inline-block rounded-full bg-primary overflow-hidden">
                  <Image src="/images/user-profile.png" alt="Foto de perfil del usuario" width={42} height={42}/>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="37" viewBox="0 0 36 37" fill="none">
                  <g clipPath="url(#clip0_70_4708)">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M19.59 24.59C19.1681 25.0114 18.5962 25.248 18 25.248C17.4037 25.248 16.8318 25.0114 16.41 24.59L7.92297 16.106C7.50108 15.6839 7.26414 15.1115 7.26428 14.5147C7.26442 13.9179 7.50163 13.3457 7.92372 12.9238C8.34581 12.5019 8.91822 12.2649 9.515 12.2651C10.1118 12.2652 10.6841 12.5024 11.106 12.9245L18 19.8185L24.894 12.9245C25.3181 12.5145 25.8864 12.2874 26.4763 12.2922C27.0663 12.2971 27.6307 12.5335 28.0481 12.9504C28.4655 13.3674 28.7024 13.9316 28.7078 14.5216C28.7132 15.1115 28.4866 15.68 28.077 16.1045L19.5915 24.5915L19.59 24.59Z"
                          fill="black"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_70_4708">
                      <rect width="36" height="36" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownSection
                 // title="Acciones"
                  showDivider
                  aria-label="Dropdown for account options"
              >
                <DropdownItem description="">
                  Editar usuario
                </DropdownItem>
                </DropdownSection>
              <DropdownSection
                  //title="Sesión"
                  aria-label="Dropdown for account options"
              >
                <DropdownItem description="" onPress={() => signOut()}>
                  Cerrar sesión
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </header>
          {children}
      </section>
    </main>
  )
}