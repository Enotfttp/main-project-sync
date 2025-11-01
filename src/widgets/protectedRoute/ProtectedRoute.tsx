import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useGetUser } from '@entities/user';
import { Loader } from '@shared/ui';
import {routesPath} from '@app/providers';

interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
}

export const ProtectedRoute = ({
  children,
  redirectTo = routesPath.enter.root
}: ProtectedRouteProps) => {
  const { data, isLoading } = useGetUser();

  if (isLoading) {
    return <Loader />;
  }

  return data ? <>{children}</> : <Navigate to={redirectTo} replace />;
};
