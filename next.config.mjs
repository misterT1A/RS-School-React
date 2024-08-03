import path from 'path';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src', 'styles')],
    prependData: `@import "./styles/_vars.scss"; @import "./styles/_mixins.scss"; @import "./styles/_style.scss";`,
  },
};

export default nextConfig;
