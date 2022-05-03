import { Outlet } from 'react-router-dom';
import { Footer } from './footer';
import { Header } from './header';

export const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);
