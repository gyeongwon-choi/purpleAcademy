import useSize from "@/hooks/useSize";
import useTimeout from "@/hooks/useTimeout";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

// 유틸: 자음/모음 판별
const isVowels = (char) => {
  const vowels = "aeiou";
  return vowels.includes(char);
};

export default function GroupStamps({
  stageData,
  activityId,
  goToNextActivity,
  goToPrevActivity,
  goToActivity,
}) {
  const { resizedWidth, resizedHeight } = useSize();

  const [stampStates, setStampStates] = useState(Array(8).fill("gray"));
  const [stampTexts, setStampTexts] = useState(stageData.word.split(""));

  useEffect(() => {
    if (activityId === "2") {
      const updated = stampTexts.map((char) =>
        isJamoConsonant(char) ? "blue" : "red"
      );
      setStampStates(updated);
    }
    if (activityId === "3") {
      setStampStates(Array(8).fill("gray"));
    }
    if (activityId === "4") {
      const updated = stampTexts.map((char) =>
        isVowels(char.toLowerCase()) ? "red" : "blue"
      );
      setStampStates(updated);

      const timeout = setTimeout(() => {
        goToNextActivity();
      }, 3000);

      return () => clearTimeout(timeout);
    }
    if (activityId === "5") {

    }
  }, [activityId, stampTexts]);

  const handleStampClick = (index) => {
    // activityId === "4"면 클릭 동작 없음
    if (activityId === "4") return;

    setStampStates((prev) => {
      const current = prev[index];
      const newStates = [...prev];

      if (activityId === "3") {
        newStates[index] = current === "green" ? "gray" : "green";
      }

      return newStates;
    });
  };


  const handleCheck = () => {
    const greenCount = stampStates.filter((state) => state === "green").length;
    const correctCount = stageData.word.length; // 정답 개수 기준

    if (greenCount === correctCount) {
      goToNextActivity();
    } else {
      console.log("틀림");
    }
  };

  const imageMap = {
    gray: "/images/weeks/w2soundMapper/stamp_gray.png",
    green: "/images/weeks/w2soundMapper/stamp_green.png",
    red: "/images/weeks/w2soundMapper/stamp_red.png",
    blue: "/images/weeks/w2soundMapper/stamp_blue.png",
    redText: "/images/weeks/w2soundMapper/text_red.png",
    blueText: "/images/weeks/w2soundMapper/text_blue.png",
  };

  return (
    <>
      <Stamp
        src={imageMap[stampStates[0]]}
        top={resizedHeight * 0.6}
        left={1}
        width={resizedWidth * 0.1}
        onClick={() => handleStampClick(0)}
      />
      <Stamp
        src={imageMap[stampStates[1]]}
        top={resizedHeight * 0.6}
        left={12}
        width={resizedWidth * 0.1}
        onClick={() => handleStampClick(1)}
      />
      <Stamp
        src={imageMap[stampStates[2]]}
        top={resizedHeight * 0.6}
        left={23}
        width={resizedWidth * 0.1}
        onClick={() => handleStampClick(2)}
      />
      <Stamp
        src={imageMap[stampStates[3]]}
        top={resizedHeight * 0.6}
        left={34}
        width={resizedWidth * 0.1}
        onClick={() => handleStampClick(3)}
      />
      <Stamp
        src={imageMap[stampStates[4]]}
        top={resizedHeight * 0.6}
        left={45}
        width={resizedWidth * 0.1}
        onClick={() => handleStampClick(4)}
      />
      <Stamp
        src={imageMap[stampStates[5]]}
        top={resizedHeight * 0.6}
        left={56}
        width={resizedWidth * 0.1}
        onClick={() => handleStampClick(5)}
      />
      <Stamp
        src={imageMap[stampStates[6]]}
        top={resizedHeight * 0.6}
        left={67}
        width={resizedWidth * 0.1}
        onClick={() => handleStampClick(6)}
      />
      <Stamp
        src={imageMap[stampStates[7]]}
        top={resizedHeight * 0.6}
        left={78}
        width={resizedWidth * 0.1}
        onClick={() => handleStampClick(7)}
      />

      {/* activityId가 3일 때만 체크 버튼 렌더링 */}
      {activityId === "3" && (
        <CheckButton
          onClick={handleCheck}
          style={{
            top: resizedHeight * 0.9,
            left: resizedWidth * 0.7,
          }}
        >
          정답 확인
        </CheckButton>
      )}
    </>
  );
}

const Stamp = styled.img`
  cursor: pointer;
  width: ${({ width }) => width}px;
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}%;
  object-fit: contain;
  transition: 0.2s ease;
`;

const CheckButton = styled.button`
  position: absolute;
  padding: 12px 20px;
  font-size: 16px;
  background-color: #0066ff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    background-color: #0050cc;
  }
`;