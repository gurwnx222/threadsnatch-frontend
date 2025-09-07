/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"], // Add Montserrat font
      },
      keyframes: {
         bounceDots: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        moveBg: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "50% 50%" }, // Avoids extreme movement
    },
},
animation: {
  moveBg: "moveBg 10s linear infinite alternate",
   'typing-bounce': 'bounceDots 0.6s infinite',
},

    },
  },
  plugins: [],
}