import styled from "@emotion/styled";
import useSize from "@/hooks/useSize";

const StyledCurrentQuiz = styled.div`
  width: ${({ resizedWidth }) => resizedWidth * 0.08}px;
  height: ${({ resizedHeight }) => resizedHeight * 0.04}px;
  background-color: #fff;
  position: absolute;
  top: ${({ resizedHeight }) => resizedHeight * 0.95}px;
  right: ${({ resizedWidth }) => resizedWidth * 0}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 30px;
  z-index: 100;
  pointer-events: none;
  color: #000;
  font-family: "Lexend-SemiBold";
  font-size: ${({ resizedHeight }) => resizedHeight * 0.025}px;
`;

const CurrentQuiz = ({ quizIndex, quizLength }) => {
  const { resizedWidth, resizedHeight } = useSize();

  return (
    <StyledCurrentQuiz resizedWidth={resizedWidth} resizedHeight={resizedHeight}>
      {quizIndex} / {quizLength}
    </StyledCurrentQuiz>
  );
};

export default CurrentQuiz;
