import useSize from "@/hooks/useSize";

import styled from "@emotion/styled";

const NextBtn = ({ screenId, quizControls, screenControls }) => {
  if (!["S4"].includes(screenId)) return;

  const { resizedWidth, resizedHeight } = useSize();

  const { goToNextQuiz } = quizControls;

  const handleClickNextBtn = () => {
    //true ? goToNextQuiz() : true;
  }

  return (
    <>
      <Btn
        resizedWidth={resizedWidth} resizedHeight={resizedHeight}
        src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/nextBtn.png`}
        alt=""
        onClick={() => { handleClickNextBtn() }}
      />
    </>
  );
};

export default NextBtn;

const Btn = styled.img((props) => {
  const { resizedWidth, resizedHeight } = props;

  return {
    width: `${resizedWidth * 0.2}px`,
    position: "absolute",
    left: `50%`,
    top: `${resizedHeight * 0.88}px`,
    transform: "translate(-50%,0)",
    zIndex: "2",
    cursor: "pointer"
  };
});
