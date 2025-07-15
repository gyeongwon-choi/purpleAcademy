import { useEffect, useMemo, useRef, useState } from "react";
import useSize from "@/hooks/useSize";
import { gsap, useGSAP } from "@/libs/gsapSetup";

import useUiInteractionEnableStore from '@/store/useUiInteractionEnableStore';

import styled from "@emotion/styled";

const Screen2 = ({ quizObj, screenId, quizControls, screenControls, audioControls, effectSounds, isWrong, isCorrect }) => {
  if (screenId !== "S2") return;
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

  const quizImages = quizObj.images;
  const quizSounds = quizObj.screenMap[screenId].sounds;
  const quizCorrectSound = quizObj.screenMap[screenId].soundCorrect;
  const correctValue = quizObj.screenMap[screenId].correct;

  useEffect(() => {
    if (isCorrect) {
      bunnyImgsRef.current.default?.classList.remove("active");
      bunnyImgsRef.current.correct?.classList.add("active");
    } else {
      bunnyImgsRef.current.correct?.classList.remove("active");
      bunnyImgsRef.current.default?.classList.add("active");
    }
  }, [isCorrect]);

  useEffect(() => {
    if (isWrong) {
      bunnyImgsRef.current.default?.classList.remove("active");
      bunnyImgsRef.current.wrong?.classList.add("active");
    } else {
      bunnyImgsRef.current.wrong?.classList.remove("active");
      bunnyImgsRef.current.default?.classList.add("active");
    }
  }, [isWrong]);

  // 보기 나타나는 순서 (공통1)
  const randomPositions = useMemo(() => {
    const shuffled = ["pos-1", "pos-2", "pos-3"].sort(() => Math.random() - 0.5);
    return shuffled;
  }, []);

  // 보기 이미지 선택
  const handleClickAnswer = (e) => {
    if (e.currentTarget.dataset.answer === correctValue) { // 정답

      playSingle(effectSounds.find(e => e.name === "correct").src);

      bunnyImgsRef.current.default?.classList.remove("active");
      bunnyImgsRef.current.correct?.classList.add("active");

      setTimeout(() => {
        goToNextScreen();
      }, 500);

    } else { // 오답

      playSingle(effectSounds.find(e => e.name === "wrong").src);

      bunnyImgsRef.current.default?.classList.remove("active");
      bunnyImgsRef.current.wrong?.classList.add("active");

      setTimeout(() => {
        bunnyImgsRef.current.wrong?.classList.remove("active");
        bunnyImgsRef.current.default?.classList.add("active");
      }, 500);

    }
  }

  return (
    <>
      <Bunny
        resizedWidth={resizedWidth}
        resizedHeight={resizedHeight}
      >
        <img
          ref={el => bunnyImgsRef.current.default = el}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s2_char.png`}
          alt=""
          className="active"
        />

        <img
          ref={el => bunnyImgsRef.current.wrong = el}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/char_wrong.png`}
          alt=""
        />

        <img
          ref={el => bunnyImgsRef.current.correct = el}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/char_correct.png`}
          alt=""
        />
      </Bunny>

      {/* <AnswerBox resizedWidth={resizedWidth} resizedHeight={resizedHeight}>
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
          onClick={() => { playSingle(quizCorrectSound.src) }}
        />
      </AnswerBox> */}

      {/* <BtnsBox resizedWidth={resizedWidth} resizedHeight={resizedHeight}>
        <BtnsBg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/btns_wrap.png`}
          alt=""
        />

        <Word
          resizedWidth={resizedWidth}
          resizedHeight={resizedHeight}
          pos={randomPositions[0]}
          word={`${quizSounds[0].name}`}
          data-answer={quizSounds[0].name}
          onClick={(e) => { handleClickAnswer(e) }}
        >
          <img src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/word_green.png`} alt="" />
          <span>{quizSounds[0].name}</span>
        </Word>
        <SpeakerBtn
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/speakerBtn.png`}
          alt=""
          pos={randomPositions[0]}
          onClick={() => { playSingle(quizSounds[0].src) }}
        />
        <Word
          resizedWidth={resizedWidth}
          resizedHeight={resizedHeight}
          pos={randomPositions[1]}
          word={`${quizSounds[1].name}`}
          data-answer={quizSounds[1].name}
          onClick={(e) => { handleClickAnswer(e) }}
        >
          <img src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/word_orange.png`} alt="" />
          <span>{quizSounds[1].name}</span>
        </Word>
        <SpeakerBtn
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/speakerBtn.png`}
          alt=""
          pos={randomPositions[1]}
          onClick={() => { playSingle(quizSounds[1].src) }}
        />
        <Word
          resizedWidth={resizedWidth}
          resizedHeight={resizedHeight}
          pos={randomPositions[2]}
          word={`${quizSounds[2].name}`}
          data-answer={quizSounds[2].name}
          onClick={(e) => { handleClickAnswer(e) }}
        >
          <img src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/word_pink.png`} alt="" />
          <span>{quizSounds[2].name}</span>
        </Word>
        <SpeakerBtn
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/speakerBtn.png`}
          alt=""
          pos={randomPositions[2]}
          onClick={() => { playSingle(quizSounds[2].src) }}
        />
      </BtnsBox> */}
    </>
  );
};

export default Screen2;

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

const AnswerBox = styled.div((props) => {
  const { resizedWidth, resizedHeight } = props;

  return {
    width: `${resizedWidth * 0.65}px`,
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
  left: `50%`,
  top: `55%`,
  transform: "translate(-50%,-50%)",
}));

const SpeakerBtn = styled.img((props) => {
  const { resizedWidth, resizedHeight, pos } = props;

  const positionMap = {
    "pos-0": {
      left: "18%",
      top: "auto",
      bottom: "8%",
    },
    "pos-1": {
      left: "62%",
      top: "24%",
    },
    "pos-2": {
      left: "62%",
      top: "49%",
    },
    "pos-3": {
      left: "62%",
      top: "74%",
    },
  };

  const position = positionMap[pos];

  return {
    width: `${resizedWidth * 0.05}px`,
    height: `${resizedWidth * 0.05}px`,
    position: "absolute",
    left: `${position.left}`,
    top: `${position.top}`,
    bottom: `${position.bottom}`,
    zIndex: "2",
    cursor: "pointer"
  };
});

const Word = styled.div((props) => {
  const { resizedWidth, resizedHeight, pos, word } = props;

  const positionMap = {
    "pos-1": {
      top: "19%",
    },
    "pos-2": {
      top: "44%",
    },
    "pos-3": {
      top: "69%",
    },
  };

  const position = positionMap[pos] || { top: "auto" };

  const wordMap = {
    "a": {
      bottom: "10%",
    },
    "b": {
      bottom: "0%",
    },
    "c": {
      bottom: "10%",
    },
    "d": {
      bottom: "5%",
    },
    "e": {
      bottom: "10%",
    },
    "f": {
      bottom: "0%",
    },
    "g": {
      bottom: "20%",
    },
    "h": {
      bottom: "0%",
    },
    "i": {
      bottom: "0%",
    },
    "j": {
      bottom: "10%",
    },
    "k": {
      bottom: "0%",
    },
    "l": {
      bottom: "0%",
    },
    "m": {
      bottom: "15%",
    },
    "n": {
      bottom: "10%",
    },
    "o": {
      bottom: "10%",
    },
    "p": {
      bottom: "20%",
    },
    "q": {
      bottom: "20%",
    },
    "r": {
      bottom: "10%",
    },
    "s": {
      bottom: "10%",
    },
    "t": {
      bottom: "0%",
    },
    "u": {
      bottom: "10%",
    },
    "v": {
      bottom: "10%",
    },
    "w": {
      bottom: "10%",
    },
    "x": {
      bottom: "10%",
    },
    "y": {
      bottom: "20%",
    },
    "z": {
      bottom: "10%",
    },
  };

  const padding = wordMap[word] || { bottom: "0" };

  return {
    width: `${resizedWidth * 0.09}px`,
    height: `${resizedWidth * 0.09}px`,
    position: "absolute",
    left: `10%`,
    top: `${position.top}`,
    color: "#fff",
    fontFamily: "Lexend-ExtraBold",
    fontSize: `${resizedWidth * 0.05}px`,
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
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: `${padding.bottom}`
    }
  };
});

const BtnsBox = styled.div((props) => {
  const { resizedWidth, resizedHeight } = props;

  return {
    width: `${resizedWidth * 0.18}px`,
    height: `${resizedHeight * 0.55}px`,
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