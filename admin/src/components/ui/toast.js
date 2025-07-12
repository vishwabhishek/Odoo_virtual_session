import * as React from "react";

const ToastContext = React.createContext();

export function useToast() {
  return React.useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const showToast = React.useCallback((toast) => {
    setToasts((prev) => [...prev, { ...toast, id: Date.now() }]);
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, toast.duration || 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded shadow bg-card border text-card-foreground ${toast.variant === 'destructive' ? 'bg-red-600 text-white' : ''}`}
            role="status"
            aria-live="polite"
          >
            {toast.title && <div className="font-semibold">{toast.title}</div>}
            <div>{toast.description}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
