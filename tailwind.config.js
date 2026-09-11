/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#15171A',
          soft: '#3A3D42',
          faint: '#8A8D93',
        },
        paper: {
          DEFAULT: '#F5F3EE',
          raised: '#FFFFFF',
          sunken: '#EBE7DD',
        },
        line: '#E1DED2',
        rail: {
          DEFAULT: '#121317',
          raised: '#1B1D22',
          line: 'rgba(255,255,255,0.09)',
          text: 'rgba(255,255,255,0.68)',
        },
        signal: {
          DEFAULT: '#3F7A5C',
          soft: '#E3ECE4',
          strong: '#28543D',
        },
        amber: {
          DEFAULT: '#C98A2E',
          soft: '#F5EAD6',
        },
        rust: {
          DEFAULT: '#B23A2E',
          soft: '#F5E1DD',
        },
        indigo: {
          DEFAULT: '#5B4FE8',
          soft: '#EBE9FC',
          strong: '#3E35B0',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        lg: '14px',
        xl: '20px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(21,23,26,0.05), 0 1px 1px rgba(21,23,26,0.04)',
        panel: '0 12px 32px -8px rgba(21,23,26,0.18)',
        rail: 'inset -1px 0 0 rgba(255,255,255,0.06)',
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(21,23,26,0.05) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
}
