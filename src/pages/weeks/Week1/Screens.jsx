import { useEffect, useState } from "react";
import useSize from "@/hooks/useSize";

import Screen1 from "./Screen1";

export default function Screens({
  quizObj,
  screenId,
  goToNextScreen,
  goToPrevScreen,
  goToScreen,
}) {
  const commonProps = {
    quizObj,
    screenId,
    goToNextScreen,
    goToPrevScreen,
    goToScreen,
  };

  return (
    <>
      <Screen1 {...commonProps} />
      {/* <Screen2 {...commonProps} />
      <Screen3 {...commonProps} />
      <Screen4 {...commonProps} /> */}
    </>
  );
}

const Screen2 = () => <div>여기는 S2 화면입니다.</div>;
const Screen3 = () => <div>여기는 S3 화면입니다.</div>;
const Screen4 = () => <div>여기는 S4 화면입니다.</div>;