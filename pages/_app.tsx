// pages/_app.tsx
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
// import Layout from '../components/Layout';
import Layout from '../layout/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout title="Your Title" description="Your description" keywords="keywords" author="author">
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
