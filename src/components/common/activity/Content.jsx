import useSize from "@/hooks/useSize";
import styled from "@emotion/styled";

const StyledContent = styled.div`
  position: absolute;
  //background-color: rgba(0,0,0,0.3); /* dev */
  width: ${({ resizedWidth }) => resizedWidth}px;
  height: ${({ resizedHeight }) => resizedHeight}px;
  bottom: ${({ resizedWidth, resizedHeight }) =>
    window.innerWidth * 800 > window.innerHeight * 1145
      ? 0
      : (((window.innerHeight * 1145) / (window.innerWidth * 800) - 1) / 2.74) * resizedHeight}px;
`;

const Content = ({ children }) => {
  const { resizedWidth, resizedHeight } = useSize();

  return (
    <StyledContent resizedWidth={resizedWidth} resizedHeight={resizedHeight}>
      {children}
    </StyledContent>
  );
}

export default Content;