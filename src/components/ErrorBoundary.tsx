import { Component, type ReactNode } from 'react';

interface EBProps {
  children: ReactNode;
}
interface EBState {
  error: Error | null;
}

export class ErrorBoundary extends Component<EBProps, EBState> {
  state: EBState = { error: null };
  static getDerivedStateFromError(error: Error): EBState {
    return { error };
  }
  render(): ReactNode {
    if (this.state.error) {
      return (
        <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif', maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ color: '#dc2626' }}>Something went wrong</h2>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', background: '#f8f8f8', padding: 12, borderRadius: 8, fontSize: 13 }}>
            {this.state.error.message}
            {'\n\n'}{(this.state.error.stack || '').slice(0, 1200)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
