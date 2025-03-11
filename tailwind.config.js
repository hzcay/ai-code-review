/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#333333',
        'chat-bg': '#ffffff',
        'user-message': '#f5f5f5',
        'bot-message': '#ffffff',
        'hover-color': '#f1f1f1',
        'sidebar-hover': '#eeeeee',
      },
      boxShadow: {
        'message': '0 1px 4px rgba(0, 0, 0, 0.05)',
        'input': '0 1px 5px rgba(0, 0, 0, 0.05)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'chat': '0.5rem',
      },
    },
  },
  plugins: [],
} 