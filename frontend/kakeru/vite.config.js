import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser', // Usa Terser para minificar
    terserOptions: {
      compress: {
        drop_console: true, // Elimina los console.log en producción
      },
    },
  },
})

