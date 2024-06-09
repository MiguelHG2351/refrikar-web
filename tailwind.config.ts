import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'refrikar-gradient': 'linear-gradient(178deg, #0094DA 2.05%, #FFF 97.95%)'
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        gray: {
          primary: "var(--color-gray)",
        },
        red: {
          primary: "#DC2626",
        },
        green: {
          primary: "#008676",
        },
        "accent-1": "var(--color-accent-1)",
        "accent-2": "var(--color-accent-2)",
      },
      boxShadow: {
        "card-primary": "0px 0px 12.2px 1px rgba(0, 0, 0, 0.25)",
        "card-secondary": "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      screens: {
        '1xl': '1440px',
      }
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
export default config
