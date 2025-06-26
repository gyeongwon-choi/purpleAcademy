import { useEffect, useState } from "react";
import useAspectRatioStore from "@/store/useAspectRatioStore";

// 반응형 사이즈 조절
const useSize = () => {
  const aspectRatio = useAspectRatioStore(state => state.aspectRatio);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const computeSize = () => {
    const { width, height } = windowSize;
    if (aspectRatio * 834 > 1194) {
      const newWidth = (1194 * height) / 834;
      return { resizedWidth: newWidth, resizedHeight: height };
    } else {
      const newHeight = (width * 834) / 1194;
      return { resizedWidth: width, resizedHeight: newHeight };
    }
  };

  const [size, setSize] = useState(computeSize);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setSize(computeSize());
  }, [windowSize, aspectRatio]);

  return size; // { resizedWidth, resizedHeight }
};

export default useSize;
