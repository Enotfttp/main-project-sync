import { ErrorModal } from "@features/server-error";
import { getErrorStatus } from "@shared/api";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

interface State {
  error: Error | null;
}

class Boundary extends Component<Props & { onReset: () => void }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  private retry = () => {
    this.props.onReset();
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;

    if (!error) return this.props.children;

    return (
      <ErrorModal
        status={getErrorStatus(error)}
        error={error}
        onClose={this.props.onClose}
        onRetry={this.retry}
      />
    );
  }
}

export const ErrorBoundary = ({ children, onClose }: Props) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <Boundary onClose={onClose} onReset={reset}>
        {children}
      </Boundary>
    )}
  </QueryErrorResetBoundary>
);
