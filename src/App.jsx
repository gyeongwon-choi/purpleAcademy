import { Outlet, useLocation } from "react-router-dom";
import useAspectRatioListener from "@/hooks/useAspectRatioListener";

export default function App() {
  useAspectRatioListener();

  const location = useLocation();

  return (
    <>
      <Outlet />
    </>
  );
}
