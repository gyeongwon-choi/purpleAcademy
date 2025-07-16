import useSize from "@/hooks/useSize";

import styled from "@emotion/styled";

const Board = ({ quizObj, screenId, audioControls }) => {
  if (!["S2", "S3", "S4"].includes(screenId)) return;

  const { resizedWidth, resizedHeight } = useSize();

  const { playSingle } = audioControls;

  const quizImages = quizObj.images;
  const quizCorrectSound = quizObj.screenMap["S2"].soundCorrect;
  const quizWord = quizObj.word;
  const correctWord = quizObj.screenMap["S2"].correct;
  const quizSoundPosition = quizObj.screenMap["S3"].soundPosition;

  // 음가 위치 찾기
  const getCharIndices = (text, targetChar, positionType) => {
    const lowerText = text.toLowerCase();
    const lowerChar = targetChar.toLowerCase();

    const indices = [];

    for (let i = 0; i < lowerText.length; i++) {
      if (lowerText[i] === lowerChar) {
        indices.push(i);
      }
    }

    if (indices.length === 0) return [];

    switch (positionType) {
      case "first":
        return [indices[0]]; // 첫 번째 등장 인덱스

      case "last":
        return [indices[indices.length - 1]]; // 마지막 등장 인덱스

      case "middle":
        return indices.slice(1, -1); // 첫/마지막 제외한 중간 인덱스들

      default:
        throw new Error("Invalid positionType. Use 'first', 'middle', or 'last'.");
    }
  }

  // 음가 강조
  const highlightCharInText = (text, targetChar, positionType) => {
    const indicesToHighlight = getCharIndices(text, targetChar, positionType);

    return text.split("").map((char, idx) => {
      if (indicesToHighlight.includes(idx)) {
        return (
          <span key={idx} style={{ color: "red" }}>
            {char}
          </span>
        );
      }
      return char;
    });
  }

  return (
    <>
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
          onClick={() => { playSingle(quizCorrectSound.src) }}
        />
        {screenId !== "S2" && (
          <>
            <AnswerText resizedWidth={resizedWidth} resizedHeight={resizedHeight}>
              {highlightCharInText(quizWord, correctWord, quizSoundPosition)}
            </AnswerText>
          </>
        )}
      </AnswerBox>
    </>
  );
};

export default Board;

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

const AnswerBg = styled.img(() => ({
  width: "100%",
  height: "100%",
  objectFit: "contain"
}));
const AnswerImg = styled.img(() => ({
  width: `50%`,
  height: `50%`,
  objectFit: "contain",
  position: "absolute",
  left: `50%`,
  top: `55%`,
  transform: "translate(-50%,-50%)",
}));

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

const AnswerText = styled.div((props) => {
  const { resizedWidth } = props;

  return {
    position: "absolute",
    left: `50%`,
    top: `80%`,
    transform: "translate(-50%,0)",
    color: "#000",
    fontFamily: "Lexend-ExtraBold",
    fontSize: `${resizedWidth * 0.05}px`,
  };
});