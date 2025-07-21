import { useMemo } from "react";

export default function useShuffledArray(array = []) {
  return useMemo(() => {
    return [...array].sort(() => Math.random() - 0.5);
  }, []);
}
