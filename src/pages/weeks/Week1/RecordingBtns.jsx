import { useEffect, useState } from "react";
import useSize from "@/hooks/useSize";

import useUiInteractionEnableStore from '@/store/useUiInteractionEnableStore';

import styled from "@emotion/styled";

const ACTIVITY_IMG_PATH = `${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity`;

const RecordingBtns = ({
  audioControls,
  recordControls
}) => {
  const { ready, playFromBlob, stopAll, setOnRecordPlayEnded } = audioControls;
  const { isRecording, startRecording, stopRecording, audioBlob } = recordControls;
  const { resizedWidth, resizedHeight } = useSize();
  const { setInteractionEnabled } = useUiInteractionEnableStore();
  const [isPlaying, setIsPlaying] = useState(false);

  // 녹음 시작 버튼
  const handleClickRecord = () => {
    if (isRecording) { // 녹음 정지
      stopRecording();
    } else { // 녹음 시작
      startRecording();
    }
  };

  // 녹음 음성 재생 버튼
  const handleClickPlay = () => {
    if (isRecording) return;
    if (!audioBlob) {
      console.warn("녹음된 오디오가 아직 준비되지 않았습니다.");
      return;
    }

    if (isPlaying) { // 정지
      stopAll();
      setIsPlaying(false);
    } else { // 시작
      stopAll();
      playFromBlob(audioBlob);
      setIsPlaying(true);
    }
  };

  // 녹음 음성 재생 끝났을 때
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
          src={`${ACTIVITY_IMG_PATH}/btns_wrap_record.png`}
          alt=""
        />
        <RecordBtn
          resizedWidth={resizedWidth}
          resizedHeight={resizedHeight}
          src={`${ACTIVITY_IMG_PATH}/${isRecording ? "recordBtn_text_recording" : "recordBtn_text"}.png`}
          alt=""
          onClick={() => {
            handleClickRecord();
          }}
        />
        <PlayBtn
          resizedWidth={resizedWidth}
          resizedHeight={resizedHeight}
          src={`${ACTIVITY_IMG_PATH}/${isPlaying ? "recordPauseBtn_text" : "recordPlayBtn_text"}.png`}
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
