import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

const cherryPickedKeys = [
  "REACT_APP_OPEN_API_KEY",
];

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv = {};
  cherryPickedKeys.forEach(key => processEnv[key] = env[key]);
  return {
    plugins: [react()],
    define: {
      'process.env': processEnv
    }
  }
})