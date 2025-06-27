import useSize from "@/hooks/useSize";
import useTimeout from "@/hooks/useTimeout";
import styled from "@emotion/styled";

export default function GroupCap({ quizData, screenId, goToNextScreen, goToPrevScreen, goToScreen }) {
  const { resizedWidth, resizedHeight } = useSize();
  useTimeout(goToNextScreen, 2000);

  return (
    <>
      <Cap
        src="/images/weeks/w2soundMapper/cap.png"
        resizedWidth={resizedWidth}
        resizedHeight={resizedHeight}
      />
    </>
  );
}

const Cap = styled.img`
  cursor: pointer;
  width: ${({ resizedWidth }) => resizedWidth * 0.15}px;
  position: absolute;
  top: ${({ resizedHeight }) => resizedHeight * 0.4}px;
  left: ${({ resizedWidth }) => resizedWidth * 0.3}px;
  object-fit: contain;
`;