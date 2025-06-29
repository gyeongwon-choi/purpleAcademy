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
  const [currentScreenComponent, setCurrentScreenComponent] = useState(null);
  const images = quizObj.images;

  useEffect(() => {
    // 각 화면에 맞는 로직 설정
    const executeLogic = () => {
      switch (screenId) {
        case "S1":
          setCurrentScreenComponent(<Screen1 correct={quizObj.screenMap.S1.correct} images={images} sounds={quizObj.screenMap.S1.sounds} />);
          break;
        case "S2":
          setCurrentScreenComponent(<Screen2 />);
          break;
        case "S3":
          setCurrentScreenComponent(<Screen3 />);
          break;
        case "S4":
          setCurrentScreenComponent(<Screen4 />);
          break;
        default:
          setCurrentScreenComponent(<div>잘못된 화면입니다.</div>);
          break;
      }
    };

    executeLogic();
  }, [screenId]);

  return (
    <>
      {currentScreenComponent}
    </>
  );
}

const Screen2 = () => <div>여기는 S2 화면입니다.</div>;
const Screen3 = () => <div>여기는 S3 화면입니다.</div>;
const Screen4 = () => <div>여기는 S4 화면입니다.</div>;