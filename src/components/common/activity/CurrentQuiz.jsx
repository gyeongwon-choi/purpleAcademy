import styled from "@emotion/styled";
import useSize from "@/hooks/useSize";

const StyledCurrentQuiz = styled.div`
  width: ${({ resizedWidth }) => resizedWidth * 0.11}px;
  height: ${({ resizedHeight }) => resizedHeight * 0.06}px;
  position: absolute;
  bottom: ${({ resizedHeight }) => resizedHeight * 0.01}px;
  right: ${({ resizedWidth }) => resizedWidth * 0.01}px;
  background-image: url(${({ bgSrc }) => bgSrc});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  color: #fff;
  font-family: "SBAggroB";
  font-size: ${({ resizedHeight }) => resizedHeight * 0.03}px;
`;

const CurrentQuiz = ({ quizIndex, quizLength, currentQuizObj, isRecording }) => {
  const { resizedWidth, resizedHeight } = useSize();
  const { defaultSrc, recordingSrc } = currentQuizObj.imgSrc;
  
  const bgSrc = isRecording ? recordingSrc : defaultSrc;

  return (
    <StyledCurrentQuiz resizedWidth={resizedWidth} resizedHeight={resizedHeight} bgSrc={bgSrc} >
      {quizIndex} / {quizLength}
    </StyledCurrentQuiz>
  );
};

export default CurrentQuiz;
