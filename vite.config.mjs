import {defineConfig} from 'vite';
export default defineConfig({base:'./',build:{rollupOptions:{input:{index:'index.html',quant:'quant.html',scenario:'scenario.html',mission:'mission.html'}}}});
