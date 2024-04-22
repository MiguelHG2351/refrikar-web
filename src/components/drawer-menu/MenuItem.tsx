import Link from "next/link";
import React from "react";

type MenuItemState = 'active' | 'inactive' | 'disabled';

type IconSize = {
  width: number;
  height: number;
}

// interface iconProps extends IconSize {
//   className?: string;
//   width: number;
//   height: number;
// }

type MenuItemProps = {
  state?: MenuItemState;
  text: string;
  // icon componente recive width and heght props
  icon: React.FC<any>;
  // icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconSize: IconSize;
};

export default function MenuItem({ state = 'inactive', text, icon: Icon, iconSize }: MenuItemProps) {
  const colorVariant: Record<MenuItemState, any> = {
    active: {
      text: 'bg-secondary inline-flex items-center gap-x-2 text-white py-2 px-2 rounded-md w-full',
      icon: 'fill-white'
    },
    inactive: {
      text: 'bg-transparent inline-flex items-center gap-x-2 text-black py-2 px-2 rounded-md w-full',
      icon: 'fill-black'
    },
    disabled: {
      text: 'bg-white inline-flex gap-x-2 text-black py-2 px-2 rounded-md w-full',
      icon: 'fill-black'
    },
  }
  console.log(iconSize)
  
  return (
    <li>
      <Link
        href="#"
        className={colorVariant[state].text}>
        <Icon width={iconSize.width} height={iconSize.height} className={colorVariant[state].icon} />
        {text}
      </Link>
    </li>
  );
}
