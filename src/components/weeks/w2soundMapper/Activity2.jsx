import useSize from "@/hooks/useSize";
import useTimeout from "@/hooks/useTimeout";
import styled from "@emotion/styled";

export default function Activity2({ stageData, activityId, goToNextActivity, goToPrevActivity, goToActivity }) {
  const { resizedWidth, resizedHeight } = useSize();
  useTimeout(goToNextActivity, 2000);

  return (
    <>
      
    </>
  );
}