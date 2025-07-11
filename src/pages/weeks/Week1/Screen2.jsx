import { useEffect, useMemo, useRef, useState } from "react";
import useSize from "@/hooks/useSize";
import { gsap, useGSAP } from "@/libs/gsapSetup";

import useUiInteractionEnableStore from '@/store/useUiInteractionEnableStore';

import styled from "@emotion/styled";

const Screen1 = ({ quizObj, screenId, quizControls, screenControls, audioControls, effectSounds }) => {
  if (screenId !== "S2") return;
  const { resizedWidth, resizedHeight } = useSize();

  const { setInteractionEnabled } = useUiInteractionEnableStore();
  const { goToNextQuiz, goToPrevQuiz, goToQuiz } = quizControls;
  const { goToNextScreen, goToPrevScreen, goToScreen } = screenControls;
  const { playSingle, playMultiple, playInSequence, stopAll } = audioControls;

  const quizImages = quizObj.images;
  const quizSounds = quizObj.screenMap[screenId].sounds;
  const quizCorrectSound = quizObj.screenMap[screenId].soundCorrect;
  const correctValue = quizObj.screenMap[screenId].correct;
  console.log(quizObj);

  // 보기 나타나는 순서 (공통1)
  const randomPositions = useMemo(() => {
    const shuffled = ["pos-1", "pos-2", "pos-3"].sort(() => Math.random() - 0.5);
    return shuffled;
  }, []);

  // 보기 이미지 선택
  const handleClickAnswer = (e) => {
    if (e.target.dataset.answer === correctValue) { // 정답
      //console.log("정답");
      playSingle(effectSounds.find(e => e.name === "correct").src);
      goToNextScreen();
    } else { // 오답
      playSingle(effectSounds.find(e => e.name === "wrong").src);
      //console.log("오답");
    }
  }

  return (
    <>
      <Bunny
        resizedWidth={resizedWidth}
        resizedHeight={resizedHeight}
      >
        <img
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s2_char.png`}
          alt=""
        />
      </Bunny>

      <AnswerBox resizedWidth={resizedWidth} resizedHeight={resizedHeight}>
        <AnswerBg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/answerBg_big.png`}
          alt=""
        />
        <AnswerImg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={quizImages[0].src}
          alt=""
        />
        <SpeakerBtn
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/speakerBtn.png`}
          alt=""
          pos="pos-0"
          onClick={() => { playSingle(quizSounds[0].src) }}
        />

        <Word
          resizedWidth={resizedWidth}
          resizedHeight={resizedHeight}
          pos={randomPositions[0]}
          onClick={() => { playSingle(quizSounds[0].src) }}
          //data-answer={quizSounds[0].name}
          //onClick={(e) => { handleClickAnswer(e) }}
        >
          <img src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/word_green.png`} alt="" />
          <span>{quizSounds[0].name}</span>
        </Word>
        <SpeakerBtn
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/speakerBtn.png`}
          alt=""
          pos={randomPositions[0]}
        />
        <Word
          resizedWidth={resizedWidth}
          resizedHeight={resizedHeight}
          pos={randomPositions[1]}
          onClick={() => { playSingle(quizSounds[1].src) }}
        >
          <img src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/word_orange.png`} alt="" />
          <span>{quizSounds[1].name}</span>
        </Word>
        <SpeakerBtn
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/speakerBtn.png`}
          alt=""
          pos={randomPositions[1]}
        />
        <Word
          resizedWidth={resizedWidth}
          resizedHeight={resizedHeight}
          pos={randomPositions[2]}
          onClick={() => { playSingle(quizSounds[2].src) }}
        >
          <img src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/word_pink.png`} alt="" />
          <span>{quizSounds[2].name}</span>
        </Word>
        <SpeakerBtn
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/speakerBtn.png`}
          alt=""
          pos={randomPositions[2]}
        />
      </AnswerBox>
    </>
  );
};

export default Screen1;

const Bunny = styled.div((props) => ({
  width: `${props.resizedWidth * 0.15}px`,
  position: "absolute",
  left: `${props.resizedWidth * 0.001}px`,
  top: `${props.resizedHeight * 0.55}px`,
  cursor: "pointer",

  img: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    position: "absolute",
    left: "0px",
    top: "0px",
  },

}));

const AnswerBox = styled.div((props) => {
  const { resizedWidth, resizedHeight } = props;

  return {
    width: `${resizedWidth * 0.7}px`,
    height: `${resizedHeight * 0.7}px`,
    position: "absolute",
    left: `${resizedWidth * 0.15}px`,
    top: `${resizedHeight * 0.15}px`,
  };
});

const AnswerBg = styled.img((props) => ({
  width: "100%",
  height: "100%",
  objectFit: "contain"
}));
const AnswerImg = styled.img((props) => ({
  width: `50%`,
  height: `50%`,
  objectFit: "contain",
  position: "absolute",
  left: `41%`,
  top: `45%`,
  transform: "translate(-50%,-50%)",
  cursor: "pointer"
}));

const SpeakerBtn = styled.img((props) => {
  const { resizedWidth, resizedHeight, pos } = props;

  const positionMap = {
    "pos-0": {
      left: "4%",
      top: "20%",
    },
    "pos-1": {
      left: "85%",
      top: "18%",
    },
    "pos-2": {
      left: "85%",
      top: "37%",
    },
    "pos-3": {
      left: "85%",
      top: "57%",
    },
  };

  const position = positionMap[pos];

  return {
    width: `${resizedWidth * 0.07}px`,
    height: `${resizedWidth * 0.07}px`,
    position: "absolute",
    left: `${position.left}`,
    top: `${position.top}`,
    zIndex: "2",
    cursor: "pointer"
  };
});

const Word = styled.div((props) => {
  const { resizedWidth, resizedHeight, pos } = props;

  const positionMap = {
    "pos-1": {
      top: "15%",
    },
    "pos-2": {
      top: "35%",
    },
    "pos-3": {
      top: "55%",
    },
  };

  const position = positionMap[pos];

  return {
    width: `${resizedWidth * 0.1}px`,
    height: `${resizedWidth * 0.1}px`,
    position: "absolute",
    left: `70%`,
    top: `${position.top}`,
    color: "#fff",
    fontFamily: "OneMobilePop-Regular",
    fontSize: `${resizedWidth * 0.07}px`,
    paddingBottom: `2%`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",

    img: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      position: "absolute",
      left: "0px",
      top: "0px",
    },

    span: {
      zIndex: "1",
    }
  };
});