import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useGetUser } from '@entities/user';
import { Loader } from '@shared/ui/Loader/Loader.tsx';

interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
}

export const ProtectedRoute = ({
                                 children,
                                 redirectTo = '/login'
                               }: ProtectedRouteProps) => {
  const { data, isLoading } = useGetUser();

  if (isLoading) {
    return <Loader />
  }

  return data ? <>{children}</> : <Navigate to={redirectTo} replace />
}
