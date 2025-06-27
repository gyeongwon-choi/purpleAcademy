import useSize from "@/hooks/useSize";
import useTimeout from "@/hooks/useTimeout";
import styled from "@emotion/styled";

export default function Activity2({ quizData, screenId, goToNextScreen, goToPrevScreen, goToScreen }) {
  const { resizedWidth, resizedHeight } = useSize();
  useTimeout(goToNextScreen, 2000);

  return (
    <>
      
    </>
  );
}