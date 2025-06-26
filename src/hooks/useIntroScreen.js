import { useState } from "react";

// 썸네일
export default function useIntroScreen() {
  const [isIntroVisible, setIsIntroVisible] = useState(true);

  const showIntro = () => {
    setIsIntroVisible(true);
  };

  const endIntro = () => {
    setIsIntroVisible(false);
  };

  return { isIntroVisible, showIntro, endIntro };
}
