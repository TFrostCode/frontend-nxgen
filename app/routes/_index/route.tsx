import { useEffect } from "react";
export default function Index() {
  return (
    useEffect(() => {
      window.location.href = "/auth/login";
    }, [])
  );
}