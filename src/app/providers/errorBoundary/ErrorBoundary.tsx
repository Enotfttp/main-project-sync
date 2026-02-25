import { RouterErrorBoundary } from "./RouterErrorBoundary";
import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  type?: "modal" | "page";
}

interface State {
  hasError: boolean;
  error?: Error | null;
  errorInfo?: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo: errorInfo,
    });
    // eslint-disable-next-line no-console
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <RouterErrorBoundary type={this.props?.type} />;
    }

    return this.props.children;
  }
}
