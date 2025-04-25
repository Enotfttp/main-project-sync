import { Outlet } from 'react-router-dom';
import { Header } from '@widgets/index';
import {StyledMainLayout} from "./MainLayout.styled";

export const MainLayout = () => (
  <>
    <Header />
    <StyledMainLayout>
      <Outlet />
    </StyledMainLayout>
  </>
);

