import { useEffect, useRef } from "react";

export default function useInActivityWatcher({
  timeout = 30000,
  onTimeout,
}) {
  const timerRef = useRef(null);

  useEffect(() => {

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        onTimeout?.();
      }, timeout);
    };

    const handleClick = (e) => {
      const target = e.target.closest('[data-action="click"]');
      if (target) resetTimer();
    };

    document.addEventListener("click", handleClick);
    resetTimer();

    return () => {
      document.removeEventListener("click", handleClick);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeout, onTimeout]);
}
