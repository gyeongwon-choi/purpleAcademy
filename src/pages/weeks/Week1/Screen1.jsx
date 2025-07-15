import { useEffect, useMemo, useRef, useState } from "react";
import useSize from "@/hooks/useSize";
import { gsap, useGSAP } from "@/libs/gsapSetup";

import styled from "@emotion/styled";

const Screen1 = ({ quizObj, screenId, quizControls, screenControls, audioControls, effectSounds, setIsWrong, setIsCorrect }) => {
  if (screenId !== "S1") return;
  const { resizedWidth, resizedHeight } = useSize();
  const bunnyRef = useRef(null);
  const bunnyImgsRef = useRef({
    move: [],
    scrab: [],
    wrong: null,
    correct: null,
  });
  const startedRef = useRef(false);
  const { goToNextQuiz, goToPrevQuiz, goToQuiz } = quizControls;
  const { goToNextScreen, goToPrevScreen, goToScreen } = screenControls;
  const { playSingle, playMultiple, playInSequence, stopAll } = audioControls;
  
  const quizImages = quizObj.images;
  const quizSounds = quizObj.screenMap[screenId].sounds;
  const quizSampleSound = quizObj.screenMap[screenId].soundExample;
  const correctValue = quizObj.screenMap[screenId].correct;

  useEffect(() => {
    if (!resizedWidth || !resizedHeight || startedRef.current) return;

    startedRef.current = true;

    const tl = gsap.timeline();

    // 위치 이동 애니메이션
    tl.fromTo(
      bunnyRef.current,
      { x: resizedWidth * -0.2 },
      {
        x: resizedWidth * 0.01,
        duration: 2,
        ease: "linear",
      }
    );

    // 걷는 모션 애니메이션
    tl.to({},
      {
        duration: 2,
        onUpdate: function () {
          const frameIndex = Math.floor(this.time() / 0.12) % 3;
          bunnyImgsRef.current.move.forEach((img, idx) => {
            if (img) {
              img.classList.toggle("active", idx === frameIndex);
            }
          });
        },
      },
      "-=2"
    );

    // 긁적이기 애니메이션
    tl.to({}, {
      duration: 2,
      onUpdate: function () {
        const frameIndex = Math.floor(this.time() / 0.3) % 2;
        bunnyImgsRef.current.move.forEach((img, idx) => {
          if (img) {
            img.classList.remove("active");
          }
        });
        bunnyImgsRef.current.scrab.forEach((img, idx) => {
          if (img) {
            img.classList.toggle("active", idx === frameIndex);
          }
        });
      },
    });

  }, [resizedWidth, resizedHeight]);

  // 보기 나타나는 순서 (공통1)
  const randomPositions = useMemo(() => {
    const shuffled = ["pos-1", "pos-2", "pos-3"].sort(() => Math.random() - 0.5);
    return shuffled;
  }, []);

  // 보기 이미지 선택
  const handleClickAnswer = (e) => {
    if (e.currentTarget.dataset.answer === correctValue) { // 정답
      playSingle(effectSounds.find(e => e.name === "correct").src);
      setIsCorrect(true);

      bunnyImgsRef.current.move.concat(bunnyImgsRef.current.scrab).forEach((img) => {
        img?.classList.remove("active");
      });
      bunnyImgsRef.current.correct?.classList.add("active");

      setTimeout(() => {
        goToNextScreen();
      }, 500);

    } else { // 오답
      playSingle(effectSounds.find(e => e.name === "wrong").src);
      setIsWrong(true);

      bunnyImgsRef.current.move.concat(bunnyImgsRef.current.scrab).forEach((img) => {
        img?.classList.remove("active");
      });
      bunnyImgsRef.current.wrong?.classList.add("active");

      setTimeout(() => {
        bunnyImgsRef.current.wrong?.classList.remove("active");
        bunnyImgsRef.current.scrab[1]?.classList.add("active");
        setIsWrong(false);
      }, 500);

    }
  }

  return (
    <>
      <Bunny
        resizedWidth={resizedWidth}
        resizedHeight={resizedHeight}
        ref={bunnyRef}
        onClick={() => { playSingle(quizSampleSound.src) }}
      >
        <img
          ref={el => bunnyImgsRef.current.move[0] = el}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s1_char_move_1.png`}
          alt=""
        />
        <img
          ref={el => bunnyImgsRef.current.move[1] = el}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s1_char_move_2.png`}
          alt=""
        />
        <img
          ref={el => bunnyImgsRef.current.move[2] = el}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s1_char_move_3.png`}
          alt=""
        />

        <img
          ref={el => bunnyImgsRef.current.scrab[0] = el}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s1_char_question_1.png`}
          alt=""
        />
        <img
          ref={el => bunnyImgsRef.current.scrab[1] = el}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s1_char_question_2.png`}
          alt=""
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

      <AnswerBox resizedWidth={resizedWidth} resizedHeight={resizedHeight} pos={randomPositions[0]}>
        <AnswerBg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/answerBg_small.png`}
          alt=""
        />
        <AnswerImg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={quizImages[0].src}
          alt=""
          data-answer={quizSounds[0].name}
          onClick={(e) => { handleClickAnswer(e) }}
        />
        <TreasureImg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/treasure.png`}
          alt=""
          pos={randomPositions[0]}
        />
        <SpeakerBtn
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/speakerBtn.png`}
          alt=""
          onClick={() => { playSingle(quizSounds[0].src) }}
        />
      </AnswerBox>

      <AnswerBox resizedWidth={resizedWidth} resizedHeight={resizedHeight} pos={randomPositions[1]}>
        <AnswerBg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/answerBg_small.png`}
          alt=""
        />
        <AnswerImg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={quizImages[1].src}
          alt=""
          data-answer={quizSounds[1].name}
          onClick={(e) => { handleClickAnswer(e) }}
        />
        <TreasureImg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/treasure.png`}
          alt=""
          pos={randomPositions[1]}
        />
        <SpeakerBtn
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/speakerBtn.png`}
          alt=""
          onClick={() => { playSingle(quizSounds[1].src) }}
        />
      </AnswerBox>

      <AnswerBox resizedWidth={resizedWidth} resizedHeight={resizedHeight} pos={randomPositions[2]}>
        <AnswerBg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/answerBg_small.png`}
          alt=""
        />
        <AnswerImg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={quizImages[2].src}
          alt=""
          data-answer={quizSounds[2].name}
          onClick={(e) => { handleClickAnswer(e) }}
        />
        <TreasureImg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/treasure.png`}
          alt=""
          pos={randomPositions[2]}
        />
        <SpeakerBtn
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/speakerBtn.png`}
          alt=""
          onClick={() => { playSingle(quizSounds[2].src) }}
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
    opacity: 0,
  },

  "img.active": {
    opacity: 1,
  },

}));

const AnswerBox = styled.div((props) => {
  const { resizedWidth, resizedHeight, pos } = props;

  const positionMap = {
    "pos-1": {
      left: resizedWidth * 0.01,
      top: resizedHeight * 0.15,
    },
    "pos-2": {
      left: resizedWidth * 0.34,
      top: resizedHeight * 0.15,
    },
    "pos-3": {
      left: resizedWidth * 0.67,
      top: resizedHeight * 0.15,
    },
  };

  const position = positionMap[pos];

  return {
    width: `${resizedWidth * 0.32}px`,
    height: `${resizedHeight * 0.35}px`,
    position: "absolute",
    left: `${position.left}px`,
    top: `${position.top}px`,
  };
});

const AnswerBg = styled.img((props) => ({
  width: "100%",
  height: "100%",
  objectFit: "contain",
}));
const AnswerImg = styled.img((props) => ({
  width: `55%`,
  height: `55%`,
  objectFit: "contain",
  position: "absolute",
  left: `50%`,
  top: `54%`,
  transform: "translate(-50%,-50%)",
  cursor: "pointer"
}));
const TreasureImg = styled.img((props) => {
  const { resizedWidth, pos } = props;

  const positionMap = {
    "pos-1": {
      left: "75%",
    },
    "pos-2": {
      left: "50%",
    },
    "pos-3": {
      left: "25%",
    },
  };

  const position = positionMap[pos];

  return {
    width: `${resizedWidth * 0.09}px`,
    position: "absolute",
    left: `${position.left}`,
    top: `120%`,
    transform: "translate(-50%,0%)",
    zIndex: "1"
  };
});
const SpeakerBtn = styled.img((props) => ({
  width: `12%`,
  position: "absolute",
  right: `12%`,
  bottom: `5%`,
  zIndex: "2",
  cursor: "pointer"
}));