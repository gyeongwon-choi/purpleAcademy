import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import { motion } from "motion/react";

export default function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <div key={location.pathname}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </>
  );
}
