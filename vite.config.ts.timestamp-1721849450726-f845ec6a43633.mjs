// vite.config.ts
import react from 'file:///C:/Users/parad/OneDrive/Desktop/repositoryes/RS-School-React/node_modules/@vitejs/plugin-react/dist/index.mjs';
import { defineConfig } from 'file:///C:/Users/parad/OneDrive/Desktop/repositoryes/RS-School-React/node_modules/vite/dist/node/index.js';
import eslint from 'file:///C:/Users/parad/OneDrive/Desktop/repositoryes/RS-School-React/node_modules/vite-plugin-eslint/dist/index.mjs';
import { viteStaticCopy } from 'file:///C:/Users/parad/OneDrive/Desktop/repositoryes/RS-School-React/node_modules/vite-plugin-static-copy/dist/index.js';
var vite_config_default = defineConfig({
  plugins: [
    react(),
    eslint(),
    viteStaticCopy({
      targets: [
        {
          src: 'netlify.toml',
          dest: '',
        },
      ],
    }),
  ],
  resolve: {
    alias: [
      { find: '@/Assets', replacement: '/src/Assets' },
      { find: '@/Components', replacement: '/src/Components' },
    ],
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/styles/_vars.scss";
        @import "./src/styles/_mixins.scss";
        @import "./src/styles/_globals.scss";
        `,
      },
    },
  },
  server: {
    port: 3e3,
  },
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwYXJhZFxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXHJlcG9zaXRvcnllc1xcXFxSUy1TY2hvb2wtUmVhY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBhcmFkXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxccmVwb3NpdG9yeWVzXFxcXFJTLVNjaG9vbC1SZWFjdFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcGFyYWQvT25lRHJpdmUvRGVza3RvcC9yZXBvc2l0b3J5ZXMvUlMtU2Nob29sLVJlYWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCBlc2xpbnQgZnJvbSAndml0ZS1wbHVnaW4tZXNsaW50JztcclxuaW1wb3J0IHsgdml0ZVN0YXRpY0NvcHkgfSBmcm9tICd2aXRlLXBsdWdpbi1zdGF0aWMtY29weSc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBlc2xpbnQoKSxcclxuICAgIHZpdGVTdGF0aWNDb3B5KHtcclxuICAgICAgdGFyZ2V0czogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNyYzogJ25ldGxpZnkudG9tbCcsXHJcbiAgICAgICAgICBkZXN0OiAnJyxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczogW1xyXG4gICAgICB7IGZpbmQ6ICdAL0Fzc2V0cycsIHJlcGxhY2VtZW50OiAnL3NyYy9Bc3NldHMnIH0sXHJcbiAgICAgIHsgZmluZDogJ0AvQ29tcG9uZW50cycsIHJlcGxhY2VtZW50OiAnL3NyYy9Db21wb25lbnRzJyB9LFxyXG4gICAgXSxcclxuICB9LFxyXG4gIGNzczoge1xyXG4gICAgbW9kdWxlczoge1xyXG4gICAgICBsb2NhbHNDb252ZW50aW9uOiAnY2FtZWxDYXNlJyxcclxuICAgIH0sXHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgIHNjc3M6IHtcclxuICAgICAgICBhZGRpdGlvbmFsRGF0YTogYFxyXG4gICAgICAgIEBpbXBvcnQgXCIuL3NyYy9zdHlsZXMvX3ZhcnMuc2Nzc1wiO1xyXG4gICAgICAgIEBpbXBvcnQgXCIuL3NyYy9zdHlsZXMvX21peGlucy5zY3NzXCI7XHJcbiAgICAgICAgQGltcG9ydCBcIi4vc3JjL3N0eWxlcy9fZ2xvYmFscy5zY3NzXCI7XHJcbiAgICAgICAgYCxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDMwMDAsXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1gsT0FBTyxXQUFXO0FBQ3RZLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sWUFBWTtBQUNuQixTQUFTLHNCQUFzQjtBQUcvQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxlQUFlO0FBQUEsTUFDYixTQUFTO0FBQUEsUUFDUDtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsRUFBRSxNQUFNLFlBQVksYUFBYSxjQUFjO0FBQUEsTUFDL0MsRUFBRSxNQUFNLGdCQUFnQixhQUFhLGtCQUFrQjtBQUFBLElBQ3pEO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ1Asa0JBQWtCO0FBQUEsSUFDcEI7QUFBQSxJQUNBLHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLGdCQUFnQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFLbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
