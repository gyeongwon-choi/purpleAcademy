import { useState } from "react";
import useSize from "@/hooks/useSize";
import useShuffledArray from "@/hooks/useShuffledArray";
import useInActivityWatcher from "@/hooks/useInActivityWatcher";

import styled from "@emotion/styled";
import InactivityNotice from "@/components/common/activity/InactivityNotice";

const ACTIVITY_IMG_PATH = `${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity`;

const Screen1 = ({ quizObj, screenId, screenControls, audioControls, effectSounds, setIsWrong, setIsCorrect }) => {
  const { resizedWidth, resizedHeight } = useSize();
  const [inActivityState, setInActivityState] = useState(false);
  const { goToNextScreen } = screenControls;
  const { playSingle } = audioControls;

  const quizImages = quizObj.images;
  const quizSounds = quizObj.screenMap[screenId].sounds;
  const correctValue = quizObj.screenMap[screenId].correct;

  // 30초간 액션 없을 시 (data-action="click" 속성이 있는 요소 클릭 시 리셋)
  useInActivityWatcher({
    timeout: 30000,
    onTimeout: () => {
      setInActivityState(true);
    },
  });

  // 보기 나타나는 순서
  const randomPositions = useShuffledArray(["pos-1", "pos-2", "pos-3"]);

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
      {quizSounds.map((sound, index) => {
        const isCorrect = sound.name === correctValue;
        const img = quizImages[index];
        const pos = randomPositions[index];

        return (
          <AnswerBox key={sound.name} resizedWidth={resizedWidth} resizedHeight={resizedHeight} pos={pos}>
            <AnswerBg
              resizedWidth={resizedWidth}
              resizedHeight={resizedHeight}
              src={`${ACTIVITY_IMG_PATH}/answerBg_small.png`}
              alt=""
            />
            <AnswerItem
              resizedWidth={resizedWidth}
              resizedHeight={resizedHeight}
              data-answer={sound.name}
              onClick={(e) => handleClickAnswer(e)}
              data-action="click"
            >
              <AnswerImg src={img.src} alt="" />
              {inActivityState && isCorrect && (
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
            </AnswerItem>
            <TreasureImg
              resizedWidth={resizedWidth}
              resizedHeight={resizedHeight}
              src={`${ACTIVITY_IMG_PATH}/treasure.png`}
              alt=""
              pos={pos}
            />
            <SpeakerBtn
              resizedWidth={resizedWidth}
              resizedHeight={resizedHeight}
              src={`${ACTIVITY_IMG_PATH}/speakerBtn.png`}
              alt=""
              onClick={() => playSingle(sound.src)}
            />
          </AnswerBox>
        );
      })}

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
const AnswerItem = styled.div((props) => ({
  width: `55%`,
  height: `55%`,
  position: "absolute",
  left: `50%`,
  top: `54%`,
  transform: "translate(-50%,-50%)",
  cursor: "pointer"
}));
const AnswerImg = styled.img((props) => ({
  width: `100%`,
  height: `100%`,
  objectFit: "contain",
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