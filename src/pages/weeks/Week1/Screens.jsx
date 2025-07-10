import { useEffect, useState } from "react";
import useSize from "@/hooks/useSize";

import Screen1 from "./Screen1";
import Screen2 from "./Screen2";

export default function Screens({
  quizObj,
  screenId,
  quizControls,
  screenControls,
  audioControls,
  effectSounds
}) {
  const commonProps = {
    quizObj,
    screenId,
    quizControls,
    screenControls,
    audioControls,
    effectSounds
  };

  return (
    <>
      <Screen1 {...commonProps} />
      <Screen2 {...commonProps} />
      {/* <Screen2 {...commonProps} />
      <Screen3 {...commonProps} />
      <Screen4 {...commonProps} /> */}
    </>
  );
}