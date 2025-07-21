import { useState } from "react";

import CurrentQuiz from "@/components/common/activity/CurrentQuiz";

import Bunnys from "./Bunnys";
import Screen1 from "./Screen1";
import WordBtns from "./WordBtns";
import Board from "./Board";
import LetsRecordBtn from "./LetsRecordBtn";
import RecordingBtns from "./RecordingBtns";
import NextBtn from "./NextBtn";
import TreasureClosed from "./TreasureClosed";

export default function Screens({
  quizObj,
  screenId,
  quizControls,
  screenControls,
  audioControls,
  effectSounds,
  quizOrder,
  currentQuizObj,
  recordControls
}) {
  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const quizId = quizObj.quizId;

  const commonProps = {
    quizObj,
    screenId,
    quizControls,
    screenControls,
    audioControls,
    effectSounds,
    quizOrder,
    isWrong,
    setIsWrong,
    isCorrect,
    setIsCorrect,
    isComplete,
    setIsComplete,
    recordControls
  };
  const screenOrder = quizObj.screenOrder;
  const isRecordingScreen = screenOrder[screenOrder.length -1] === screenId;

  return (
    <>
      <Bunnys {...commonProps} />
      {["S1"].includes(screenId) && <Screen1 {...commonProps} />}
      {["S2", "S3"].includes(screenId) && <WordBtns {...commonProps} />}
      {["S2", "S3", "S4"].includes(screenId) && <Board {...commonProps} />}
      {["S3"].includes(screenId) && <LetsRecordBtn {...commonProps} />}
      {["S4"].includes(screenId) && <TreasureClosed {...commonProps} />}
      {["S4"].includes(screenId) && <RecordingBtns {...commonProps} />}
      {["S4"].includes(screenId) && <NextBtn {...commonProps} />}
      <CurrentQuiz
        quizIndex={quizOrder.indexOf(quizId) + 1}
        quizLength={quizOrder.length}
        currentQuizObj={currentQuizObj}
        isRecordingScreen={isRecordingScreen}
      />
    </>
  );
}
