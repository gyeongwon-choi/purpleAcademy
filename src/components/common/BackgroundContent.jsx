import styled from "@emotion/styled";

const StyledBg = styled.div`
  width: 100vw;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
  background: url("/images/weeks/w2soundMapper/test.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 110%;
`;

const BackgroundContent = ({ children }) => {

  return (
    <StyledBg>
      {children}
    </StyledBg>
  );
}

export default BackgroundContent;