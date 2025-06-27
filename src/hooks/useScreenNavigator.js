import { useState } from "react";

// 퀴즈마다 있는 화면
export default function useScreenNavigator(screenFlow, initial = screenFlow[0]) {
  const [screenId, setScreenId] = useState(initial);

  const goToNextScreen = () => {
    const currentIndex = screenFlow.indexOf(screenId);
    const nextScreenId = screenFlow[currentIndex + 1];
    if (nextScreenId) setScreenId(nextScreenId);
  };

  const goToPrevScreen = () => {
    const currentIndex = screenFlow.indexOf(screenId);
    const prevScreenId = screenFlow[currentIndex - 1];
    if (prevScreenId) setScreenId(prevScreenId);
  };

  const goToScreen = (screenId) => {
    if (screenFlow.includes(screenId)) {
      setScreenId(screenId);
    }
  };

  return { screenId, goToNextScreen, goToPrevScreen, goToScreen };
}
