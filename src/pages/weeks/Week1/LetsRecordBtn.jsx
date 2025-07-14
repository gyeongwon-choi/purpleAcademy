import { useEffect, useMemo, useRef, useState } from "react";
import useSize from "@/hooks/useSize";
import { gsap, useGSAP } from "@/libs/gsapSetup";

import useUiInteractionEnableStore from '@/store/useUiInteractionEnableStore';

import styled from "@emotion/styled";

const LetsRecordBtn = ({ quizObj, screenId, quizControls, screenControls, audioControls, effectSounds }) => {
  if (!["S3"].includes(screenId)) return;

  const { resizedWidth, resizedHeight } = useSize();

  const { goToNextScreen, goToPrevScreen, goToScreen } = screenControls;

  return (
    <>
      <RecordBtn
        resizedWidth={resizedWidth} resizedHeight={resizedHeight}
        src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/letsRecordBtn.png`}
        alt=""
        onClick={() => { goToNextScreen() }}
      />
    </>
  );
};

export default LetsRecordBtn;

const RecordBtn = styled.img((props) => {
  const { resizedWidth, resizedHeight } = props;

  return {
    width: `${resizedWidth * 0.2}px`,
    position: "absolute",
    left: `50%`,
    top: `${resizedHeight * 0.88}px`,
    transform: "translate(-50%,0)",
    zIndex: "2",
    cursor: "pointer"
  };
});
