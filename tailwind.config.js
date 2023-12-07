/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
import CompanyData from './data.json'

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { 
        ...colors,
        primary: CompanyData.company.main_color,
      }
    },
  },
  plugins: [],
}

