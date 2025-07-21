import { useRef, useState } from "react";
import useSize from "@/hooks/useSize";
import useShuffledArray from "@/hooks/useShuffledArray";
import useInActivityWatcher from "@/hooks/useInActivityWatcher";

import styled from "@emotion/styled";
import InactivityNotice from "@/components/common/activity/InactivityNotice";

const ACTIVITY_IMG_PATH = `${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity`;

const WordBtns = ({ quizObj, screenId, screenControls, audioControls, effectSounds, setIsWrong, setIsCorrect }) => {
  const { resizedWidth, resizedHeight } = useSize();
  const [inActivityState, setInActivityState] = useState(false);
  const bunnyImgsRef = useRef({
    default: null,
    wrong: null,
    correct: null,
  });

  const { goToNextScreen } = screenControls;
  const { playSingle } = audioControls;

  const quizSounds = quizObj.screenMap["S2"].sounds;
  const correctValue = quizObj.screenMap["S2"].correct;

  // 30초간 액션 없을 시 (data-action="click" 속성이 있는 요소 클릭 시 리셋)
  useInActivityWatcher({
    timeout: 30000,
    onTimeout: () => {
      setInActivityState(true);
    },
  });

  // 보기 나타나는 순서 (공통1)
  const randomPositions = useShuffledArray(["pos-1", "pos-2", "pos-3"]);
  const colorImages = ["word_green.png", "word_orange.png", "word_pink.png"];

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

  return (
    <>
      <BtnsBox resizedWidth={resizedWidth} resizedHeight={resizedHeight}>
        <BtnsBg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${ACTIVITY_IMG_PATH}/btns_wrap.png`}
          alt=""
        />
        {quizSounds.map((sound, i) => {
          const pos = randomPositions[i];
          const isCorrect = sound.name === correctValue;

          return (
            <div key={sound.name}>
              <Word
                resizedWidth={resizedWidth}
                resizedHeight={resizedHeight}
                pos={pos}
                word={sound.name}
                data-answer={sound.name}
                data-action="click"
                onClick={handleClickAnswer}
              >
                <img src={`${ACTIVITY_IMG_PATH}/${colorImages[i]}`} alt="" />
                <span>{sound.name}</span>

                {inActivityState && isCorrect && screenId === "S2" && (
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
              </Word>

              <SpeakerBtn
                resizedWidth={resizedWidth}
                resizedHeight={resizedHeight}
                src={`${ACTIVITY_IMG_PATH}/speakerBtn.png`}
                alt=""
                pos={pos}
                onClick={() => playSingle(sound.src)}
              />
            </div>
          );
        })}
      </BtnsBox>
    </>
  );
};

export default WordBtns;

const SpeakerBtn = styled.img((props) => {
  const { resizedWidth, pos } = props;

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
  const { resizedWidth, pos, word } = props;

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
const BtnsBg = styled.img(() => ({
  width: "100%",
  height: "100%",
  objectFit: "contain"
}));