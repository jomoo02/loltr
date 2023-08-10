import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  theme: {
    screens: {
      'xs':'340px',
      ...defaultTheme.screens,
    },
    extend: {
    }
  },

}