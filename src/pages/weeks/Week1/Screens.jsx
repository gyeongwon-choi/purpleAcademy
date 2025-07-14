import { useEffect, useState } from "react";
import useSize from "@/hooks/useSize";

import Bunnys from "./Bunnys";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import WordBtns from "./WordBtns";
import Board from "./Board";
import LetsRecordBtn from "./LetsRecordBtn";

export default function Screens({
  quizObj,
  screenId,
  quizControls,
  screenControls,
  audioControls,
  effectSounds
}) {
  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const commonProps = {
    quizObj,
    screenId,
    quizControls,
    screenControls,
    audioControls,
    effectSounds,
    isWrong,
    isCorrect,
    setIsWrong,
    setIsCorrect,
  };

  return (
    <>
      <Bunnys {...commonProps} />
      <Screen1 {...commonProps} />
      <Screen2 {...commonProps} />
      <WordBtns {...commonProps} />
      <Board {...commonProps} />
      <LetsRecordBtn {...commonProps} />
      {/* <Screen4 {...commonProps} /> */}
    </>
  );
}