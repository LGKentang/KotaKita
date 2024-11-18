import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        navy: {
          1: '#e9ecef',
          2: '#1e3e62',
          3: '#1b3858',
          4: '#18324e',
          5: '#12253b',
          6: '#0f1f31',
        },
      },
      backgroundImage: {
        map: "linear-gradient(rgba(255,255,255,.9),rgba(255,255,255,.9)),url('https://images.pexels.com/photos/5725589/pexels-photo-5725589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      },
      keyframes: {
        typing: {
          '0%': {
            width: '0%',
            visibility: 'hidden',
          },
          '100%': {
            width: '60%',
          },
        },
        blink: {
          '50%': {
            borderColor: 'transparent',
          },
          '100%': {
            borderColor: 'transparent',
          },
        },
      },
      animation: {
        typing: 'typing 2.5s steps(25) infinite alternate, blink .7s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
