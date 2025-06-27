import useSize from "@/hooks/useSize";
import styled from "@emotion/styled";

export default function Activity1({ quizData, screenId, goToNextScreen, goToPrevScreen, goToScreen }) {
  const { resizedWidth, resizedHeight } = useSize();

  return (
    <>
      <Bunny 
        src="/images/weeks/w2soundMapper/bunny_bag.png"
        resizedWidth={resizedWidth}
        resizedHeight={resizedHeight}
        onClick={goToNextScreen}
      />
      <BunnyText resizedWidth={resizedWidth} resizedHeight={resizedHeight}>
        Click the<br /> Bunny!
      </BunnyText>
    </>
  );
}

const Bunny = styled.img`
  cursor: pointer;
  width: ${({ resizedWidth }) => resizedWidth * 0.15}px;
  position: absolute;
  top: ${({ resizedHeight }) => resizedHeight * 0.4}px;
  left: ${({ resizedWidth }) => resizedWidth * 0.3}px;
  object-fit: contain;
`;
const BunnyText = styled.p`
  width: ${({ resizedWidth }) => resizedWidth * 0.15}px;
  position: absolute;
  top: ${({ resizedHeight }) => resizedHeight * 0.4}px;
  left: ${({ resizedWidth }) => resizedWidth * 0.45}px;
  text-align: center;
  background-color: green;
`;