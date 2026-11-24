import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['5173-ii8m4zsckp0wy9chi0t3r-15342120.sg2.manus.computer'],
  },
});
