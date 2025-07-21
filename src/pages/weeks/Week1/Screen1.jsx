import { useMemo } from "react";
import useSize from "@/hooks/useSize";

import styled from "@emotion/styled";

const Screen1 = ({ quizObj, screenId, screenControls, audioControls, effectSounds, setIsWrong, setIsCorrect }) => {
  if (screenId !== "S1") return;
  const { resizedWidth, resizedHeight } = useSize();
  const { goToNextScreen } = screenControls;
  const { playSingle, playInSequence } = audioControls;
  
  const quizImages = quizObj.images;
  const quizSounds = quizObj.screenMap[screenId].sounds;
  const correctValue = quizObj.screenMap[screenId].correct;

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

      setTimeout(() => {
        setIsCorrect(false);
        goToNextScreen();
      }, 500);

    } else { // 오답
      playSingle(effectSounds.find(e => e.name === "wrong").src);
      setIsWrong(true);

      setTimeout(() => {
        setIsWrong(false);
      }, 500);

    }
  }

  return (
    <>
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
          onClick={() => { playInSequence([quizSounds[0].src, quizSounds[1].src, quizSounds[2].src]) }}
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
          onClick={() => { playInSequence([quizSounds[0].src, quizSounds[1].src, quizSounds[2].src]) }}
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
          onClick={() => { playInSequence([quizSounds[0].src, quizSounds[1].src, quizSounds[2].src]) }}
        />
      </AnswerBox>
    </>
  );
};

export default Screen1;

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