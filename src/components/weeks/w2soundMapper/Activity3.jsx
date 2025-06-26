import useSize from "@/hooks/useSize";
import styled from "@emotion/styled";
import DragSample1 from "@/pages/samples/DragSample1";

export default function Activity3({ stageData, activityId, goToNextActivity, goToPrevActivity, goToActivity }) {
  const { resizedWidth, resizedHeight } = useSize();

  return (
    <>
      <DragSample1 />
    </>
  );
}

