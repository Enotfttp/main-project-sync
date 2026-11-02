import { NotFoundPage } from "./NotFoundPage";
import { ErrorLayout } from "./RouterErrorBoundary.styled";
import { routesPath } from "@app/providers/config/routesPath";
import { ErrorState } from "@features/server-error";
import { useNavigate, useRevalidator, useRouteError } from "react-router-dom";

export const RouterErrorBoundary = () => {
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const error = useRouteError() as (Error & { status: number }) | undefined;
  const status = error?.status ?? 500;

  const handleClose = () => {
    const hustoryIndex = window.history.state?.idx;

    if (typeof hustoryIndex === "number" && hustoryIndex > 0) {
      navigate(-1);
      return;
    }

    navigate(routesPath.root);
  };

  const handleRetry = () => {
    revalidator.revalidate();
  };

  if (status === 404) return <NotFoundPage />;

  return (
    <ErrorLayout>
      <ErrorState
        status={status}
        error={error}
        onClose={handleClose}
        onRetry={handleRetry}
      />
    </ErrorLayout>
  );
};
