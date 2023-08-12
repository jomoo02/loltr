import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  theme: {
    extend: {
      fontSize: {
        'xxxs': ['0.625rem', '0.75rem'],
        'xxs': ['0.6875rem', '0.85rem'],
  
      },
      screens: {
        'xs': '360px',
  
      },
      colors: {
        'win': '#93c5fd',
        'loss': '#fca5a5',
        'wintext': '#5e84b1',
        'losstext': '#b73e3e'
      }
    }
  },

}