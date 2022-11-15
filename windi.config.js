import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next'],
  },
  shortcuts: {
    'input': 'py-2 px-2 rounded-lg duration-300 border-1 focus:(outline-0 border-purple-500 shadow-md) hover:(shadow-sm border-purple-300)',
    'submit-button': 'hover:(border-purple-500 shadow-lg) border border-purple-300 duration-300 font-bold text-purple-500 px-2 py-1 rounded-lg'
  }
})
