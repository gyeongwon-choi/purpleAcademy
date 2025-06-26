import styled from "@emotion/styled";
import useSize from "@/hooks/useSize";

const StyledBtnLanguage = styled.button`
  width: ${({ resizedWidth }) => resizedWidth * 0.065}px;
  height: ${({ resizedHeight }) => resizedHeight * 0.065}px;
  position: absolute;
  top: ${({ resizedHeight }) => resizedHeight * 0.003}px;
  left: ${({ resizedWidth }) => resizedWidth * 0.82}px;

  span.active {
    border: 1px solid #000;
  }
`;

const BtnLanguage = ({ isLanguageEnglish, handleClickBtnLanguage }) => {
  const { resizedWidth, resizedHeight } = useSize();

  return (
    <StyledBtnLanguage type="button" resizedWidth={resizedWidth} resizedHeight={resizedHeight} onClick={handleClickBtnLanguage} >
      <span className={isLanguageEnglish ? "active" : ""}>A</span> / <span className={isLanguageEnglish ? "" : "active"}>한</span>
    </StyledBtnLanguage>
  );
}

export default BtnLanguage;