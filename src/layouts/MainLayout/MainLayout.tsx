import { Outlet } from 'react-router-dom';
import { Header } from '@widgets/index';

export const MainLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
  </>
);

