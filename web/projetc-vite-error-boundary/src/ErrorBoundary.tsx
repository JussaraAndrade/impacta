import { Component, type ReactNode } from "react";

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

interface ErrorBoundaryProps {
    children: ReactNode;
    reset?: string | number;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Erro capturado pelo ErrorBoundary:", error, errorInfo);
    }
    componentDidUpdate(prevProps: ErrorBoundaryProps) {
        if (this.props.reset !== prevProps.reset && this.state.hasError) {
            this.setState({ hasError: false, error: null });
        }
    }
    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <div style={{ padding: "20px", backgroundColor: "#fee", borderRadius: "4px", margin: "20px" }}>
                    <h2 style={{ color: "#c33" }}>⚠️ Algo deu errado</h2>
                    <details style={{ whiteSpace: "pre-wrap", color: "#c33" }}>
                        {this.state.error?.toString()}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;