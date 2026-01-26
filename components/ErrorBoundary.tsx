import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-red-950 text-white p-10 font-mono overflow-auto">
                    <h1 className="text-2xl font-bold mb-4">SYSTEM_CRITICAL_FAILURE</h1>
                    <div className="bg-black/50 p-4 rounded border border-red-500/50 mb-6">
                        <h2 className="text-xl text-red-400 mb-2">Error: {this.state.error?.toString()}</h2>
                        <pre className="text-xs text-red-300/70 whitespace-pre-wrap">
                            {this.state.errorInfo?.componentStack}
                        </pre>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-red-800 hover:bg-red-700 rounded"
                    >
             // REBOOT SYSTEM
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
