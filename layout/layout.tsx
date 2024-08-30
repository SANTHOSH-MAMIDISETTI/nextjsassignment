import React, { ReactNode } from 'react';
import Footer from './footer';
import Header1 from './header1';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  keywords: string;
  author: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header1 />
      <br />
      <main style={{ minHeight: '68.7vh' }}>
        <ToastContainer />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
