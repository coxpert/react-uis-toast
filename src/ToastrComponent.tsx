/**
 * Main Toaster Component
 */
import React, { useEffect, FunctionComponent, memo } from "react";

import "./toastr-style";

export interface ToastProps {
  id: string;
  destroy: () => void;
  content: string;
  type?: "default" | "success" | "warning" | "error" | "info";
  duration?: number;
  icon?: JSX.Element;
}

const ToastComponent: FunctionComponent<ToastProps> = (props) => {
  const { destroy, content, icon, type, duration = 0 } = props;

  useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      destroy();
    }, duration);

    return () => clearTimeout(timer);
  }, [destroy, duration]);

  return (
    <div>
      <div className={`toast-wrapper ${type}`}>
        <div className="toast-body">
          {icon}
          <span className="toast-msg text-sm">{content}</span>
        </div>
      </div>
    </div>
  );
};

const shouldRerender = (prevProps: ToastProps, nextProps: ToastProps) => {
  return prevProps.id === nextProps.id;
};

export default memo(ToastComponent, shouldRerender);
