import { useEffect, useState } from "react";
import useSize from "@/hooks/useSize";

import CurrentQuiz from "@/components/common/activity/CurrentQuiz";

import Bunnys from "./Bunnys";
import Screen1 from "./Screen1";
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
  effectSounds,
  quizOrder,
  currentQuizObj
}) {
  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const quizId = quizObj.quizId;

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
    setIsRecording,
  };

  return (
    <>
      <Bunnys {...commonProps} />
      <Screen1 {...commonProps} />
      <WordBtns {...commonProps} />
      <Board {...commonProps} />
      <LetsRecordBtn {...commonProps} />
      <RecordingBtns {...commonProps} />
      <NextBtn {...commonProps} />
      <CurrentQuiz
        quizIndex={quizOrder.indexOf(quizId) + 1}
        quizLength={quizOrder.length}
        currentQuizObj={currentQuizObj}
        isRecording={isRecording}
      />
    </>
  );
}
