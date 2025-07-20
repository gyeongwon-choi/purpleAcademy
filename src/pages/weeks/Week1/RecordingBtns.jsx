import { useRef, useState } from "react";
import useRecorder from "@/hooks/useRecorder";
import useSize from "@/hooks/useSize";

import styled from "@emotion/styled";

const RecordingBtns = ({
  screenId,
  audioControls,
  isRecording,
  setIsRecording,
}) => {
  if (!["S4"].includes(screenId)) return;
  const { recording, audioURL, startRecording, stopRecording } = useRecorder();
  const { resizedWidth, resizedHeight } = useSize();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleClickRecord = () => {
    if (recording) {
      stopRecording();
      setIsRecording(false);
    } else {
      startRecording();
      setIsRecording(true);
    }
  };

  const handleClickPlay = () => {
    if (!audioURL) return;

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      const audio = new Audio(audioURL);
      audioRef.current = audio;
      audio.play();
      setIsPlaying(true);

      audio.onended = () => setIsPlaying(false);
    }
  };

  return (
    <>
      <BtnsBox resizedWidth={resizedWidth} resizedHeight={resizedHeight}>
        <BtnsBg
          resizedWidth={resizedWidth}
          resizedHeight={resizedHeight}
          src={`${
            import.meta.env.VITE_DIRECTORY
          }/images/week/week1/activity/btns_wrap_record.png`}
          alt=""
        />
        <RecordBtn
          resizedWidth={resizedWidth}
          resizedHeight={resizedHeight}
          src={`${
            import.meta.env.VITE_DIRECTORY
          }/images/week/week1/activity/recordBtn_text.png`}
          alt=""
          onClick={() => {
            handleClickRecord();
          }}
        />
        <PlayBtn
          resizedWidth={resizedWidth}
          resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/${
            isPlaying ? "recordPauseBtn_text" : "recordPlayBtn_text"
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
