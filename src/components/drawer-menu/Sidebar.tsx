'use client'
import { useEffect, useState } from "react"
import Menu from "./Menu"
import MenuItem from "./MenuItem"
import { AirIcon, ClientIcon, DashBoardIcon } from "../icons/Icons"
import { usePathname } from "next/navigation"

const mockupMenu = [
  {
    id: 1,
    name: 'Dashboard',
    icon: 'dashboard',
    href: '/home/dashboard'
  },
  {
    id: 2,
    name: 'Servicios',
    icon: 'users',
    href: '/home/servicios'
  }
]

export default function Sidebar() {
  // const [title, setTitle] = useState('loading...')
  // console.log(data)
  const [openMenu, setOpenMenu] = useState(false)
  const navigation = usePathname()
  console.log(navigation)

  // useEffect(() => {
  //   setTitle(document.title)
  // }, [])

  return (
      <>
        <section className="fixed top-0 bottom-0 z-20 transform -translate-x-full md:translate-x-0 md:static bg-accent-2 w-[250px]">
          <div className="py-3">
            <button className="flex justify-start w-full items-center rounded-md px-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 45 46" fill="none">
                <path
                    d="M16.5215 26.9696C16.6399 27.08 16.7349 27.213 16.8008 27.3609C16.8666 27.5088 16.9021 27.6684 16.9049 27.8302C16.9078 27.9921 16.878 28.1528 16.8174 28.3029C16.7568 28.453 16.6665 28.5893 16.5521 28.7038C16.4376 28.8183 16.3013 28.9085 16.1512 28.9691C16.0011 29.0297 15.8403 29.0595 15.6785 29.0566C15.5166 29.0538 15.357 29.0184 15.2092 28.9525C15.0613 28.8866 14.9282 28.7916 14.8179 28.6732L9.99646 23.8518C9.77073 23.6258 9.64395 23.3194 9.64395 23C9.64395 22.6806 9.77073 22.3742 9.99646 22.1482L14.8179 17.3268C14.9282 17.2083 15.0613 17.1134 15.2092 17.0475C15.357 16.9816 15.5166 16.9462 15.6785 16.9433C15.8403 16.9405 16.0011 16.9702 16.1512 17.0309C16.3013 17.0915 16.4376 17.1817 16.5521 17.2962C16.6665 17.4106 16.7568 17.547 16.8174 17.6971C16.878 17.8471 16.9078 18.0079 16.9049 18.1698C16.9021 18.3316 16.8666 18.4912 16.8008 18.6391C16.7349 18.7869 16.6399 18.92 16.5215 19.0303L13.7572 21.7946H22.9018C23.2215 21.7946 23.5281 21.9216 23.7541 22.1477C23.9802 22.3737 24.1072 22.6803 24.1072 23C24.1072 23.3197 23.9802 23.6263 23.7541 23.8523C23.5281 24.0783 23.2215 24.2053 22.9018 24.2053L13.7572 24.2053L16.5215 26.9696ZM9.2411 39.0714C7.6427 39.0714 6.10976 38.4364 4.97952 37.3062C3.84928 36.176 3.21432 34.643 3.21432 33.0446V12.9553C3.21432 11.3569 3.84928 9.824 4.97952 8.69376C6.10976 7.56352 7.6427 6.92856 9.2411 6.92856L35.7509 6.92856C37.3493 6.92856 38.8823 7.56352 40.0125 8.69376C41.1427 9.824 41.7777 11.3569 41.7777 12.9553V33.0446C41.7777 34.6428 41.143 36.1754 40.0131 37.3056C38.8832 38.4358 37.3507 39.071 35.7525 39.0714L9.2411 39.0714ZM5.62503 33.0446C5.62503 34.0037 6.00601 34.9234 6.68415 35.6016C7.3623 36.2797 8.28206 36.6607 9.2411 36.6607L27.3118 36.6607L27.3118 9.33927L9.2411 9.33927C8.28206 9.33927 7.3623 9.72025 6.68415 10.3984C6.00601 11.0765 5.62503 11.9963 5.62503 12.9553V33.0446Z"
                    fill="black"/>
              </svg>
            </button>
          </div>
          <section>
            <Menu title="Menu principal">
              <MenuItem state={navigation === '/home/dashboard' ? "active" : 'inactive'} path="/home/dashboard" text="Dashboard" icon={DashBoardIcon} iconSize={{width: 20, height: 20}}/>
              {/* <MenuItem state={navigation === '/home/dashboard' ? "active" : 'inactive'} icon={ClientIcon} iconSize={{width: 20, height: 20}} text="Cliente"/> */}
              <MenuItem state={navigation === '/home/servicios' ? "active" : 'inactive'} icon={ClientIcon} iconSize={{width: 20, height: 20}} text="Servicios" path="/home/servicios" />
            </Menu>
            <Menu title="Inventario">
              <MenuItem icon={DashBoardIcon} iconSize={{width: 20, height: 20}} text="Productos"/>
              <MenuItem icon={ClientIcon} iconSize={{width: 20, height: 20}} text="Proveedores"/>
              <MenuItem icon={ClientIcon} iconSize={{width: 20, height: 20}} text="Facturas"/>
            </Menu>
            <Menu title="Otros">
              <MenuItem icon={DashBoardIcon} iconSize={{width: 20, height: 20}} text="Financia"/>
              <MenuItem icon={ClientIcon} iconSize={{width: 20, height: 20}} text="Créditos"/>
            </Menu>
          </section>
        </section>
        <div className="fixed hidden inset-0 z-10 bg-black/50 md:hidden"></div>
      </>
  );
};
