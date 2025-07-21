import { useEffect, useState } from "react";
import useSize from "@/hooks/useSize";
import useInActivityWatcher from "@/hooks/useInActivityWatcher";

import useUiInteractionEnableStore from '@/store/useUiInteractionEnableStore';

import styled from "@emotion/styled";
import InactivityNotice from "@/components/common/activity/InactivityNotice";

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
  const [inActivityState, setInActivityState] = useState(false);

  // 30초간 액션 없을 시 (data-action="click" 속성이 있는 요소 클릭 시 리셋)
  useInActivityWatcher({
    timeout: 30000,
    onTimeout: () => {
      setInActivityState(true);
    },
  });

  // 녹음 시작 버튼
  const handleClickRecord = () => {
    if (isRecording) { // 녹음 정지
      stopRecording();
    } else { // 녹음 시작
      startRecording(4000);
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
        <RecordBtnWrap
          resizedWidth={resizedWidth}
          resizedHeight={resizedHeight}
        >
          <RecordBtn
            src={`${ACTIVITY_IMG_PATH}/${isRecording ? "recordBtn_text_recording" : "recordBtn_text"}.png`}
            alt=""
            onClick={() => {
              handleClickRecord();
            }}
          />
          {inActivityState && !audioBlob && ( // 녹음 전
            <InactivityNotice
              styleProps={`
                position: absolute;
                width: 50%;
                height: 50%;
                left: 0%;
                bottom: 0%;
              `}
            />
          )}
        </RecordBtnWrap>
        {!!audioBlob && (
          <PlayBtn
            resizedWidth={resizedWidth}
            resizedHeight={resizedHeight}
            src={`${ACTIVITY_IMG_PATH}/${isPlaying ? "recordPauseBtn_text" : "recordPlayBtn_text"}.png`}
            alt=""
            onClick={() => {
              handleClickPlay();
            }}
          />
        )}
      </BtnsBox>
    </>
  );
};

export default RecordingBtns;

const RecordBtnWrap = styled.div((props) => {
  const { resizedWidth } = props;

  return {
    width: `${resizedWidth * 0.12}px`,
    position: "absolute",
    left: `50%`,
    top: `30%`,
    transform: "translate(-50%,0)",
    zIndex: "2",
    cursor: "pointer",
    pointerEvents: "auto"
  };
});

const RecordBtn = styled.img(() => {
  return {
    width: `100%`,
    height: `100%`,
    objectFit: "contain"
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
