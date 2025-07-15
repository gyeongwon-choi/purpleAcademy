import { useEffect, useMemo, useRef, useState } from "react";
import useSize from "@/hooks/useSize";
import { gsap, useGSAP } from "@/libs/gsapSetup";

import useUiInteractionEnableStore from '@/store/useUiInteractionEnableStore';

import styled from "@emotion/styled";

const Screen4 = ({ quizObj, screenId, quizControls, screenControls, audioControls, effectSounds, isWrong, isCorrect, isRecording, setIsRecording }) => {
  if (screenId !== "S4") return;
  const { resizedWidth, resizedHeight } = useSize();
  const bunnyImgsRef = useRef({
    default: null,
    recording: null,
  });

  const { setInteractionEnabled } = useUiInteractionEnableStore();
  const { goToNextQuiz, goToPrevQuiz, goToQuiz } = quizControls;
  const { goToNextScreen, goToPrevScreen, goToScreen } = screenControls;
  const { playSingle, playMultiple, playInSequence, stopAll } = audioControls;

  const quizImages = quizObj.images;
  const quizSounds = quizObj.screenMap[screenId].sounds;
  const quizCorrectSound = quizObj.screenMap[screenId].soundCorrect;
  const correctValue = quizObj.screenMap[screenId].correct;

  useEffect(() => {
    if (isRecording) {
      bunnyImgsRef.current.default?.classList.remove("active");
      bunnyImgsRef.current.recording?.classList.add("active");
    } else {
      bunnyImgsRef.current.recording?.classList.remove("active");
      bunnyImgsRef.current.default?.classList.add("active");
    }
  }, [isRecording]);

  return (
    <>
      <Bunny
        resizedWidth={resizedWidth}
        resizedHeight={resizedHeight}
      >
        <img
          ref={el => bunnyImgsRef.current.default = el}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s4_char.png`}
          alt=""
          className="active"
        />

        <img
          ref={el => bunnyImgsRef.current.recording = el}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s4_char_recording.png`}
          alt=""
        />
      </Bunny>
    </>
  );
};

export default Screen4;

const Bunny = styled.div((props) => ({
  width: `${props.resizedWidth * 0.15}px`,
  position: "absolute",
  left: `${props.resizedWidth * 0.75}px`,
  top: `${props.resizedHeight * 0.55}px`,

  img: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    position: "absolute",
    left: "0px",
    top: "0px",
    opacity: 0,
    zIndex: 1
  },

  "img.active": {
    opacity: 1,
  },

}));