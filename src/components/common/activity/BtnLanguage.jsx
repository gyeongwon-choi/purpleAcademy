import styled from "@emotion/styled";
import useSize from "@/hooks/useSize";

const ACTIVITY_IMG_PATH = `${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity`;

const BtnLanguage = ({ isLanguageEnglish, handleClickBtnLanguage }) => {
  const { resizedWidth, resizedHeight } = useSize();

  return (
    <StyledBtnLanguage type="button" resizedWidth={resizedWidth} resizedHeight={resizedHeight} onClick={handleClickBtnLanguage} >
      <BtnImg
        src={`${ACTIVITY_IMG_PATH}/${isLanguageEnglish ? "btnLanguage_korea.png" : "btnLanguage_english.png"}`}
      />
    </StyledBtnLanguage>
  );
}

export default BtnLanguage;

const StyledBtnLanguage = styled.button`
  width: ${({ resizedHeight }) => resizedHeight * 0.045}px;
  height: ${({ resizedHeight }) => resizedHeight * 0.045}px;
  position: absolute;
  top: ${({ resizedHeight }) => resizedHeight * 0.01}px;
  left: ${({ resizedWidth }) => resizedWidth * 0.91}px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  span.active {
    border: 1px solid #000;
  }
`;

const BtnImg = styled.img`
  width: 100%;
  height: 100%;
`;