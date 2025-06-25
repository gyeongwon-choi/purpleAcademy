import styled from "@emotion/styled";
import useSize from "@/hooks/useSize";

const StyledQuestion = styled.div`
  width: ${({ resizedWidth }) => resizedWidth * 0.9}px;
  height: ${({ resizedHeight }) => resizedHeight * 0.07}px;
  background-color: #fff;
  position: absolute;
  top: ${({ resizedHeight }) => resizedHeight * 0.03}px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 30px;
  z-index: 100;
`;

const Question = ({ children }) => {
  const { resizedWidth, resizedHeight } = useSize();

  return (
    <StyledQuestion resizedWidth={resizedWidth} resizedHeight={resizedHeight}>
      {children}
    </StyledQuestion>
  );
}

export default Question;