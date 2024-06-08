import { useState, useCallback } from "react";

interface Toast {
  message: string;
  type?: "info" | "success" | "warning" | "error";
  duration?: number;
}

const useToast = () => {
  const [toast, setToast] = useState<Toast | null>(null);

  const addToast = useCallback(
    (
      message: string,
      type: "info" | "success" | "warning" | "error" = "info",
      duration: number = 3000
    ) => {
      setToast({ message, type, duration });
    },
    []
  );

  const removeToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    toast,
    addToast,
    removeToast,
  };
};

export default useToast;
