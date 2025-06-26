import useStageNavigator from "@/hooks/useStageNavigator";

export default function StageManager({ stages, renderStage }) {
  const { stage, goToNextStage, goToPrevStage } = useStageNavigator(stages.length);

  return (
    <div>
      {renderStage(stages[stage], stage)}

      <button onClick={goToPrevStage} disabled={stage === 0} style={{position: "fixed", bottom: "20px", left: "15%", zIndex: "1000"}}>이전 스테이지</button>
      <button onClick={goToNextStage} disabled={stage === stages.length - 1} style={{position: "fixed", bottom: "20px", left: "20%", zIndex: "1000"}}>다음 스테이지</button>
    </div>
  );
}
