import useScreenNavigator from "@/hooks/useScreenNavigator";

export default function ScreenManager({ quizData, renderScreen }) {
  const screenIds = quizData.screenOrder || []; // ["S1", "S2", ...]
  const { screenId, goToNextScreen, goToPrevScreen, goToScreen } = useScreenNavigator(screenIds);
  const screenIndex = screenIds.indexOf(screenId);

  return (
    <div>
      {renderScreen(screenId, goToNextScreen, goToPrevScreen, goToScreen)}

      <span style={{ position: "fixed", bottom: "20px", left: "0%", zIndex: "1000" }}>
        화면: {screenId}
      </span>

      <button
        onClick={goToPrevScreen}
        disabled={screenIndex === 0}
        style={{ position: "fixed", bottom: "20px", left: "5%", zIndex: "1000" }}
      >
        이전 화면
      </button>

      <button
        onClick={goToNextScreen}
        disabled={screenIndex === screenIds.length - 1}
        style={{ position: "fixed", bottom: "20px", left: "10%", zIndex: "1000" }}
      >
        다음 화면
      </button>
    </div>
  );
}
