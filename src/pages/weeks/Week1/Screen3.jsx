import { useEffect, useMemo, useRef, useState } from "react";
import useSize from "@/hooks/useSize";
import { gsap, useGSAP } from "@/libs/gsapSetup";

import useUiInteractionEnableStore from '@/store/useUiInteractionEnableStore';

import styled from "@emotion/styled";

const Screen3 = ({ quizObj, screenId, quizControls, screenControls, audioControls, effectSounds, isWrong, isCorrect }) => {
  if (screenId !== "S3") return;
  const { resizedWidth, resizedHeight } = useSize();
  const bunnyImgsRef = useRef({
    default: null,
    wrong: null,
    correct: null,
  });

  const { setInteractionEnabled } = useUiInteractionEnableStore();
  const { goToNextQuiz, goToPrevQuiz, goToQuiz } = quizControls;
  const { goToNextScreen, goToPrevScreen, goToScreen } = screenControls;
  const { playSingle, playMultiple, playInSequence, stopAll } = audioControls;

  return (
    <>
      <Bunny
        resizedWidth={resizedWidth}
        resizedHeight={resizedHeight}
      >
        <img
          ref={el => bunnyImgsRef.current.default = el}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s3_char.png`}
          alt=""
          className="active"
        />
      </Bunny>
    </>
  );
};

export default Screen3;

const Bunny = styled.div((props) => ({
  width: `${props.resizedWidth * 0.15}px`,
  position: "absolute",
  left: `${props.resizedWidth * 0.001}px`,
  top: `${props.resizedHeight * 0.55}px`,

  img: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    position: "absolute",
    left: "0px",
    top: "0px",
    opacity: 0,
  },

  "img.active": {
    opacity: 1,
  },

}));