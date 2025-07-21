import { useEffect, useRef, useState } from "react";
import useRecorder from "@/hooks/useRecorder";
import useSize from "@/hooks/useSize";

import useUiInteractionEnableStore from '@/store/useUiInteractionEnableStore';

import styled from "@emotion/styled";

const RecordingBtns = ({
  screenId,
  audioControls,
  isRecording,
  setIsRecording,
}) => {
  if (!["S4"].includes(screenId)) return;
  const { ready, playFromBlob, stopAll, setOnRecordPlayEnded } = audioControls;
  const { recording, audioURL, startRecording, stopRecording, audioBlob } = useRecorder();
  const { resizedWidth, resizedHeight } = useSize();
  const { setInteractionEnabled } = useUiInteractionEnableStore();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClickRecord = () => {
    if (isRecording) {
      stopRecording();
      setIsRecording(false);
    } else {
      startRecording();
      setIsRecording(true);
    }
  };

  const handleClickPlay = () => {
    if (!audioBlob) {
      console.warn("녹음된 오디오가 아직 준비되지 않았습니다.");
      return;
    }

    if (isPlaying) {
      stopAll();
      setIsPlaying(false);
    } else {
      stopAll(); // 혹시 다른 재생 중일 수 있으니 선 정지
      playFromBlob(audioBlob);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (!ready) return;

    setOnRecordPlayEnded(() => {
      //console.log("녹음음원종료");
      setInteractionEnabled(true);
      setIsPlaying(false);
    });

  }, [ready, setOnRecordPlayEnded]);

  return (
    <>
      <BtnsBox resizedWidth={resizedWidth} resizedHeight={resizedHeight}>
        <BtnsBg
          resizedWidth={resizedWidth}
          resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY
            }/images/week/week1/activity/btns_wrap_record.png`}
          alt=""
        />
        <RecordBtn
          resizedWidth={resizedWidth}
          resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY
            }/images/week/week1/activity/recordBtn_text.png`}
          alt=""
          onClick={() => {
            handleClickRecord();
          }}
        />
        <PlayBtn
          resizedWidth={resizedWidth}
          resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/${isPlaying ? "recordPauseBtn_text" : "recordPlayBtn_text"
            }.png`}
          alt=""
          onClick={() => {
            handleClickPlay();
          }}
        />
      </BtnsBox>
    </>
  );
};

export default RecordingBtns;

const RecordBtn = styled.img((props) => {
  const { resizedWidth } = props;

  return {
    width: `${resizedWidth * 0.12}px`,
    position: "absolute",
    left: `50%`,
    top: `30%`,
    transform: "translate(-50%,0)",
    zIndex: "2",
    cursor: "pointer",
  };
});
const PlayBtn = styled.img((props) => {
  const { resizedWidth } = props;

  return {
    width: `${resizedWidth * 0.12}px`,
    position: "absolute",
    left: `50%`,
    top: `60%`,
    transform: "translate(-50%,0)",
    zIndex: "2",
    cursor: "pointer",
    pointerEvents: "auto"
  };
});

const BtnsBox = styled.div((props) => {
  const { resizedWidth, resizedHeight } = props;

  return {
    width: `${resizedWidth * 0.18}px`,
    height: `${resizedHeight * 0.33}px`,
    position: "absolute",
    left: `${resizedWidth * 0.81}px`,
    top: `${resizedHeight * 0.18}px`,
  };
});
const BtnsBg = styled.img(() => ({
  width: "100%",
  height: "100%",
  objectFit: "contain",
}));
