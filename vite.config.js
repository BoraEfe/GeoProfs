import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig((props) => {
  const env = loadEnv(props.mode, process.cwd(), "VITE_APP");
  const envWithProcessPrefix = {
    "process.env": `${JSON.stringify(env)}`,
  };

  return {
      plugins: [
          react(),
          tailwindcss(),
      ],
      define: envWithProcessPrefix,
     }
  })