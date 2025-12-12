/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parking: {
          primary: '#1E40AF',    // Azul escuro
          secondary: '#10B981',  // Verde
          accent: '#F59E0B',     // Amarelo/Laranja
          dark: '#0F172A',       // Azul muito escuro
          light: '#F3F4F6',      // Cinza claro
        }
      }
    },
  },
  plugins: [],
}











