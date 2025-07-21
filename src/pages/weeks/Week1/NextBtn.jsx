import useSize from "@/hooks/useSize";

import { motion, AnimatePresence } from "framer-motion";

import styled from "@emotion/styled";

const ACTIVITY_IMG_PATH = `${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity`;

const NextBtn = ({ quizObj, quizOrder, quizControls, audioControls, effectSounds, isComplete, setIsComplete }) => {
  const { resizedWidth, resizedHeight } = useSize();
  const { goToNextQuiz } = quizControls;
  const { playSingle } = audioControls;

  const handleClickNextBtn = () => {
    if(quizObj.quizId === quizOrder[quizOrder.length - 1]) { // 마지막 퀴즈 종료 후 complete
      setIsComplete(true);
      playSingle(effectSounds.find(el => el.name === "stamp").src);
      // todo : complete 이후 클릭되는거 막기?
    }else { // 다음 퀴즈로
      goToNextQuiz();
    }
  }

  return (
    <>
      <Btn
        resizedWidth={resizedWidth} resizedHeight={resizedHeight}
        src={`${ACTIVITY_IMG_PATH}/nextBtn.png`}
        alt=""
        onClick={() => { handleClickNextBtn() }}
      />
      {isComplete && (
        <AnimatePresence>
          <Stamp
            key="stamp"
            initial={{ scale: 2, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 20,
              duration: 0.4,
            }}
            src={`${ACTIVITY_IMG_PATH}/stamp_complete_blue.png`}
            resizedWidth={resizedWidth}
            resizedHeight={resizedHeight}
          />
        </AnimatePresence>
      )}
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

const Stamp = styled(motion.img)((props) => {
  const { resizedWidth } = props;

  return {
    width: `${resizedWidth * 0.4}px`,
    position: "absolute",
    left: `47%`,
    top: `54%`,
  };
});