import { useEffect, useState } from "react";
import useSize from "@/hooks/useSize";

import Bunnys from "./Bunnys";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import Screen3 from "./Screen3";
import Screen4 from "./Screen4";
import WordBtns from "./WordBtns";
import Board from "./Board";
import LetsRecordBtn from "./LetsRecordBtn";
import RecordingBtns from "./RecordingBtns";
import NextBtn from "./NextBtn";

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
  const [isRecording, setIsRecording] = useState(false);

  const commonProps = {
    quizObj,
    screenId,
    quizControls,
    screenControls,
    audioControls,
    effectSounds,
    isWrong,
    setIsWrong,
    isCorrect,
    setIsCorrect,
    isRecording,
    setIsRecording
  };

  return (
    <>
      {/* <Bunnys {...commonProps} /> */}
      <Screen1 {...commonProps} />
      <Screen2 {...commonProps} />
      <Screen3 {...commonProps} />
      <Screen4 {...commonProps} />
      <WordBtns {...commonProps} />
      <Board {...commonProps} />
      <LetsRecordBtn {...commonProps} />
      <RecordingBtns {...commonProps} />
      <NextBtn {...commonProps} />
      {/* <Screen4 {...commonProps} /> */}
    </>
  );
}