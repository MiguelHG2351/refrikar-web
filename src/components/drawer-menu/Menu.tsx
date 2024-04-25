import React from 'react'
import MenuItem from './MenuItem'

type MenuProps = {
  children: React.ReactElement<typeof MenuItem>[]
  title: string
}

const Menu: React.FC<MenuProps> = ({ children, title }) => {
  return (
    <div className="border-t px-4 py-2">
      <h3 className="text-sm mb-2">{ title }</h3>
      <ul className="flex flex-col gap-y-2">
        { children }
      </ul>
    </div>
  )
}

export default Menu
