import { Outlet } from 'react-router-dom';
import { StyledMainLayout } from './MainLayout.styled';
import { Header } from '@widgets/index';

export const MainLayout = () => (
  <>
    <Header />
    <StyledMainLayout>
      <Outlet />
    </StyledMainLayout>
  </>
);
