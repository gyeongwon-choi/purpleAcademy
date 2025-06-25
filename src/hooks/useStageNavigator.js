import { useState } from "react";

// 주차마다 있는 스테이지
export default function useStageNavigator(dataLength) {
  // 현재 스테이지 상태
  const [stage, setStage] = useState(0);

  // 다음 스테이지로 이동
  const goToNextStage = () => {
    if (stage < dataLength) {
      setStage((prev) => prev + 1);
    }
  };

  // 이전 스테이지로 이동
  const goToPrevStage = () => {
    if (stage > 0) {
      setStage((prev) => prev - 1);
    }
  };

  // 특정 스테이지로 이동
  const goToStage = (target) => {
    if (target >= 0 && target <= dataLength) {
      setStage(target);
    }
  };

  return { stage, goToNextStage, goToPrevStage, goToStage };
}
