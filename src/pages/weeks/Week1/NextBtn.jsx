import { useState } from "react";
import useSize from "@/hooks/useSize";
import { motion, AnimatePresence } from "framer-motion";
import useInActivityWatcher from "@/hooks/useInActivityWatcher";

import styled from "@emotion/styled";
import InactivityNotice from "@/components/common/activity/InactivityNotice";

const ACTIVITY_IMG_PATH = `${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity`;

const NextBtn = ({ quizObj, quizOrder, quizControls, audioControls, effectSounds, isComplete, setIsComplete, recordControls }) => {
  const { resizedWidth, resizedHeight } = useSize();
  const [inActivityState, setInActivityState] = useState(false);
  const { goToNextQuiz } = quizControls;
  const { playSingle } = audioControls;
  const { audioBlob, emptyBlob } = recordControls;

  // 30초간 액션 없을 시 (data-action="click" 속성이 있는 요소 클릭 시 리셋)
  useInActivityWatcher({
    timeout: 30000,
    onTimeout: () => {
      setInActivityState(true);
    },
  });

  const handleClickNextBtn = () => {
    if(quizObj.quizId === quizOrder[quizOrder.length - 1]) { // 마지막 퀴즈 종료 후 complete
      setIsComplete(true);
      playSingle(effectSounds.find(el => el.name === "stamp").src);
      // todo : complete 이후 클릭하면?
    }else { // 다음 퀴즈로
      emptyBlob(); // 녹음 음성 초기화
      goToNextQuiz();
      playSingle(effectSounds.find(el => el.name === "intro").src);
    }
  }

  return (
    <>
      <BtnWrap
        resizedWidth={resizedWidth} resizedHeight={resizedHeight}
        src={`${ACTIVITY_IMG_PATH}/nextBtn.png`}
        alt=""
        onClick={() => { handleClickNextBtn() }}
      >
        <Btn
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${ACTIVITY_IMG_PATH}/nextBtn.png`}
          alt=""
          onClick={() => { handleClickNextBtn() }}
        />
        {inActivityState && !!audioBlob && ( // 녹음 후
          <InactivityNotice
            styleProps={`
              position: absolute;
              width: 50%;
              height: 50%;
              right: 0%;
              bottom: 0%;
            `}
          />
        )}
      </BtnWrap>
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

const BtnWrap = styled.div((props) => {
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
const Btn = styled.img(() => {
  return {
    width: `100%`,
    height: `100%`,
    objectFit: "contain"
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