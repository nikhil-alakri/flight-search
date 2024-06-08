import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "info" | "success" | "warning" | "error";
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 p-4 rounded shadow-lg text-white ${
        type === "info" ? "bg-blue-500" : ""
      } ${type === "success" ? "bg-green-500" : ""} ${
        type === "warning" ? "bg-yellow-500" : ""
      } ${type === "error" ? "bg-red-500" : ""}`}
    >
      {message}
      <button className="ml-2" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Toast;
