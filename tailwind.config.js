import { Container } from "postcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#4DACB5',
        white: '#FFFFFF',
        lightYellow: '#FAFFE9',
        lightGray: '#FBFBFB',
        darkCyan: '#196B74',
        yellowAccent: '#FFE177',
        offWhite: '#FAFAFA',
        cyanAccent: '#008996',
        lightCyan: '#C6EFF3',
        grayLight: '#F4F4F4',
        deepCyan: '#018B98',
        cyanSoft: '#81CFD7',
        tealDark: '#008A98',
        gold: '#E1CB16',
        gray: '#DDDDDD',
        pinkLight: '#FFDEDE',
        salmon: '#FA8072',
        textBleu : '#05606E',
        lightColor : '#E9FDFF',
      },

      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        league: ["League Gothic", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },

      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },

      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease-in forwards',
      },
    },
  },
  plugins: [],
};
