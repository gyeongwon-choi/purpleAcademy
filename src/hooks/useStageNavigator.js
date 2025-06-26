import { useState } from "react";

// 주차마다 있는 스테이지
export default function useStageNavigator(dataLength) {
  const [stage, setStage] = useState(0);

  const goToNextStage = () => {
    if (stage < dataLength) {
      setStage((prev) => prev + 1);
    }
  };

  const goToPrevStage = () => {
    if (stage > 0) {
      setStage((prev) => prev - 1);
    }
  };

  const goToStage = (target) => {
    if (target >= 0 && target <= dataLength) {
      setStage(target);
    }
  };

  return { stage, goToNextStage, goToPrevStage, goToStage };
}
