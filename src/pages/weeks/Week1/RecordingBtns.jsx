import { useEffect, useMemo, useRef, useState } from "react";
import useSize from "@/hooks/useSize";
import { gsap, useGSAP } from "@/libs/gsapSetup";

import useUiInteractionEnableStore from '@/store/useUiInteractionEnableStore';

import styled from "@emotion/styled";

const RecordingBtns = ({ quizObj, screenId, quizControls, screenControls, audioControls, effectSounds, setIsWrong, setIsCorrect, isRecording, setIsRecording }) => {
  if (!["S4"].includes(screenId)) return;
  const [isPlaying, setIsPlaying] = useState(false);
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

  const quizSounds = quizObj.screenMap["S2"].sounds;
  const correctValue = quizObj.screenMap["S2"].correct;

  // 보기 나타나는 순서 (공통1)
  const randomPositions = useMemo(() => {
    const shuffled = ["pos-1", "pos-2", "pos-3"].sort(() => Math.random() - 0.5);
    return shuffled;
  }, []);

  // 보기 이미지 선택
  const handleClickAnswer = (e) => {
    if (["S3"].includes(screenId)) return;

    if (e.currentTarget.dataset.answer === correctValue) { // 정답
      setIsCorrect(true);
      playSingle(effectSounds.find(e => e.name === "correct").src);

      bunnyImgsRef.current.default?.classList.remove("active");
      bunnyImgsRef.current.correct?.classList.add("active");

      setTimeout(() => {
        goToNextScreen();
        setIsCorrect(false);
      }, 500);

    } else { // 오답
      setIsWrong(true);
      playSingle(effectSounds.find(e => e.name === "wrong").src);

      bunnyImgsRef.current.default?.classList.remove("active");
      bunnyImgsRef.current.wrong?.classList.add("active");

      setTimeout(() => {
        bunnyImgsRef.current.wrong?.classList.remove("active");
        bunnyImgsRef.current.default?.classList.add("active");
        setIsWrong(false);
      }, 500);

    }
  }

  // 녹음 시작
  const handleClickRecord = () => {
    console.log("녹음 시작");
    setIsRecording(true);

    setTimeout(() => {
      setIsRecording(false);
    },4000);
  }

  // 녹음듣기 재생, 중지
  const handleClickPlay = () => {
    if (isPlaying) {
      console.log("녹음듣기 중단");
      setIsPlaying(false);
      return;
    }

    console.log("녹음듣기 시작");
    setIsPlaying(true);
  }

  return (
    <>
      <BtnsBox resizedWidth={resizedWidth} resizedHeight={resizedHeight}>
        <BtnsBg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/btns_wrap_record.png`}
          alt=""
        />
        <RecordBtn
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/recordBtn_text.png`}
          alt=""
          onClick={() => { handleClickRecord() }}
        />
        <PlayBtn
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/${isPlaying ? "recordPauseBtn_text" : "recordPlayBtn_text"}.png`}
          alt=""
          onClick={() => { handleClickPlay() }}
        />
      </BtnsBox>
    </>
  );
};

export default RecordingBtns;

const RecordBtn = styled.img((props) => {
  const { resizedWidth, resizedHeight } = props;

  return {
    width: `${resizedWidth * 0.12}px`,
    position: "absolute",
    left: `50%`,
    top: `30%`,
    transform: "translate(-50%,0)",
    zIndex: "2",
    cursor: "pointer"
  };
});
const PlayBtn = styled.img((props) => {
  const { resizedWidth, resizedHeight } = props;

  return {
    width: `${resizedWidth * 0.12}px`,
    position: "absolute",
    left: `50%`,
    top: `60%`,
    transform: "translate(-50%,0)",
    zIndex: "2",
    cursor: "pointer"
  };
});

const BtnsBox = styled.div((props) => {
  const { resizedWidth, resizedHeight } = props;

  return {
    width: `${resizedWidth * 0.18}px`,
    height: `${resizedHeight * 0.33}px`,
    position: "absolute",
    left: `${resizedWidth * 0.81}px`,
    top: `${resizedHeight * 0.18}px`,
  };
});
const BtnsBg = styled.img((props) => ({
  width: "100%",
  height: "100%",
  objectFit: "contain"
}));