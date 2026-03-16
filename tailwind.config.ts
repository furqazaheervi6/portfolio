import type { Config } from 'tailwindcss';
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        accent: '#e85d04',
        surface: '#0f0f0f',
      },
    },
  },
  plugins: [],
};
export default config;
