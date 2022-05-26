import { Outlet } from 'react-router-dom';
import { Footer } from './footer';

export const Layout = () => (
  <>
    <Outlet />
    <Footer />
  </>
);
