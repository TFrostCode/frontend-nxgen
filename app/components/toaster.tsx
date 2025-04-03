import { Toaster } from "react-hot-toast";

export function CustomToaster() {
  return (
    <Toaster
      position="bottom-left"
      toastOptions={{
        style: {
          background: "#1F2937",
          color: "#fff",
          minWidth: "300px",
        },
        success: {
          style: {
            background: "#10B981",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#10B981",
          },
        },
        error: {
          style: {
            background: "#EF4444",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#EF4444",
          },
        },
        loading: {
          style: {
            background: "#1F2937",
          },
        },
      }}
    />
  );
}
