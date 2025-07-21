import { useEffect } from "react";

import useUiInteractionEnableStore from '@/store/useUiInteractionEnableStore';

import useAudio from "@/hooks/useAudio";
import useRecorder from "@/hooks/useRecorder";
import useThumbnailScreen from "@/hooks/useThumbnailScreen";

import HearMatch from "@/components/activities/HearMatch";
import LinkOut from "@/components/common/activity/LinkOut";
import ThumbNail from "./Thumbnail";
import WEEK1_DATA from "./data";
import Screens from "./Screens";

const ACTIVITY_IMG_PATH = `${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity`;

export default function Week1() {
  const { isThumbnailVisible, endThumbnail } = useThumbnailScreen();
  const { setInteractionEnabled } = useUiInteractionEnableStore();
  // 효과음 음원 경로 배열
  const effectSoundSrcs = WEEK1_DATA.effectSounds.map(e => e.src);
  // 퀴즈 음원 경로 배열
  const quizSoundSrcs = Object.values(WEEK1_DATA.quiz.quizs).flatMap((quizItem) =>
    Object.values(quizItem.screenMap).flatMap((screen) =>
      screen.sounds
        ? Object.values(screen.sounds).map((soundObj) => soundObj.src)
        : []
    )
  );
  // 퀴즈 샘플 음원 경로 배열
  const quizSoundExampleSrcs = Object.values(WEEK1_DATA.quiz.quizs).flatMap((quizItem) =>
    Object.values(quizItem.screenMap)
      .filter((screen) => screen.soundExample) // soundExample이 있는 경우만
      .map((screen) => screen.soundExample.src)
  );
  /* 객체말고 배열 내 객체 */
  /* const quizSoundExampleSrcs = Object.values(WEEK1_DATA.quiz.quizs).flatMap((quizItem) =>
    Object.values(quizItem.screenMap).flatMap((screen) =>
      screen.soundExamples
        ? screen.soundExamples.map((example) => example.src)
        : []
    )
  ); */
  // 퀴즈 정답 음원 경로 배열
  const quizSoundCorrectSrcs = Object.values(WEEK1_DATA.quiz.quizs).flatMap((quizItem) =>
    Object.values(quizItem.screenMap)
      .filter((screen) => screen.soundCorrect) // soundCorrect가 있는 경우만
      .map((screen) => screen.soundCorrect.src)
  );

  // 음원 로딩을 위해 경로만 배열로 통합
  const soundSrcs = [...effectSoundSrcs, ...quizSoundSrcs, ...quizSoundExampleSrcs, ...quizSoundCorrectSrcs];

  // 음원은 한번에 로딩해서 사용, 내부적으로 기기체크
  const { ready, envRef, playSingle, playMultiple, playInSequence, stopAll, setOnEachStarted, setOnEachEnded, setOnAllEnded, playFromBlob, setOnRecordPlayEnded } = useAudio(soundSrcs);

  const { isRecording, startRecording, stopRecording, audioBlob, emptyBlob } = useRecorder();

  // 음원재생중 인터렉션 막기
  useEffect(() => {
    if (!ready) return;

    // 음원 시작
    setOnEachStarted(() => {
      //console.log("재생 시작!");
      setInteractionEnabled(false);
    });

    // 개별 음원 종료
    setOnEachEnded(() => {
      //console.log("개별음원종료");
      setInteractionEnabled(true);
    });

    // 여러 음원 종료
    setOnAllEnded(() => {
      //console.log("여러음원종료");
      setInteractionEnabled(true);
    });

  }, [ready, setOnEachStarted, setOnEachEnded, setOnAllEnded]);

  // 액티비티 start 버튼
  const handleBtnStart = async () => {

    try {
      // 1. 첫 번째 클릭 시 getUserMedia() 호출 (마이크 권한 요청)
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // 2. AudioContext를 활성화 (iOS에서만 필요)
      if (envRef.current) {
        await envRef.current.resume();  // AudioContext를 활성화 시킴
      }

      // 3. 이후 다른 음성 파일들을 재생할 수 있도록 준비
      console.log("오디오 권한 활성화됨");

      // **추가**: 이곳에서 음성을 재생할 수 있도록 관련 함수나 코드 호출 가능

    } catch (err) {
      console.error("오디오 권한 활성화 실패:", err);
    }

    // 썸네일 종료
    endThumbnail();

    // 썸네일에서 퀴즈1 > 화면1 로 넘어갈 때 모션사운드
    playSingle(WEEK1_DATA.effectSounds.find(e => e.name === "intro").src);

  }

  // 썸네일
  if (isThumbnailVisible) {
    return (
      <>
        <LinkOut to="/" imageSrc={`${ACTIVITY_IMG_PATH}/prevBtn.png`}>나가기</LinkOut>
        <ThumbNail thumbnailObj={WEEK1_DATA.thumbnail} handleBtnStart={handleBtnStart} />
      </>
    );
  }

  return (
    <>
      <LinkOut to="/" imageSrc={`${ACTIVITY_IMG_PATH}/prevBtn.png`}>나가기</LinkOut>
      <HearMatch
        data={WEEK1_DATA}
        audioControls={{
          ready,
          playSingle,
          playMultiple,
          playInSequence,
          stopAll,
          playFromBlob,
          setOnRecordPlayEnded
        }}
        ScreensComponent={Screens}
        recordControls={{
          isRecording,
          startRecording,
          stopRecording,
          audioBlob,
          emptyBlob
        }}
      />
    </>
  );
}

