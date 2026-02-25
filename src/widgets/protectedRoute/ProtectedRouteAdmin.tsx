import { routesPath } from "@app/providers";
import { useServices } from "@entities/admin/hook";
import { Loader } from "@shared/ui";
import * as React from "react";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRouteAdmin = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const location = useLocation();
  const { data: services, isLoading } = useServices();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (location.pathname === "/adminka" && services && services.length > 0) {
      setShouldRedirect(true);
    }
  }, [location.pathname, services]);

  if (isLoading) {
    return <Loader />;
  }

  if (shouldRedirect && services && services.length > 0) {
    return (
      <Navigate to={routesPath.adminka.fullPath(services[0].id)} replace />
    );
  }

  return <>{children}</>;
};
