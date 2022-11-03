import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next'],
  },
  shortcuts: {
    'input': 'py-2 px-2 rounded-lg border focus:(outline-1 outline-purple-500) hover:(outline-purple-500)',
    'submit-button': 'hover:(border-purple-500 shadow-lg) border-2 border-purple-300 duration-300 font-bold text-purple-500 px-2 py-1 rounded-lg'
  }
})
