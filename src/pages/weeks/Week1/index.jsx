import useAudio from "@/hooks/useAudio";
import useThumbnailScreen from "@/hooks/useThumbnailScreen";
import WEEK1_DATA from "./data";

import HearMatch from "@/components/activities/HearMatch";
import ThumbNail from "./Thumbnail";

export default function Week1() {
  const { isThumbnailVisible, endThumbnail } = useThumbnailScreen();
  const effectSounds = Object.values(WEEK1_DATA.effectSounds);
  const quizSounds = Object.values(WEEK1_DATA.quiz.quizs).flatMap((quizItem) =>
    Object.values(quizItem.screenMap).flatMap((screen) =>
      screen.sounds ? Object.values(screen.sounds) : []
    )
  );
  //console.log(WEEK1_DATA);
  const sounds = [...effectSounds, ...quizSounds];

  // 음원은 한번에 로딩해서 사용, 내부적으로 기기체크
  const { ready, playSingle, playMultiple, playInSequence, stopAll } = useAudio(sounds);

  // 썸네일 start 버튼
  const handleBtnStart = () => {
    endThumbnail();
    // todo : 화면1 시작 모션 사운드
    playSingle(WEEK1_DATA.effectSounds.intro, false)
  }

  // 썸네일
  if (isThumbnailVisible) {
    return (
      <>
        <ThumbNail endThumbnail={endThumbnail} thumbnailObj={WEEK1_DATA.thumbnail} handleBtnStart={handleBtnStart} />
        {/* <button type="button" onClick={() => playSingle(WEEK1_DATA.quiz.quizs.Q1.screenMap.S1.sounds.cap, false)} style={{position: "relative", zIndex: "1"}}>인트로</button>
        <button type="button" onClick={() => playInSequence([WEEK1_DATA.quiz.quizs.Q1.screenMap.S1.sounds.cap, WEEK1_DATA.quiz.quizs.Q1.screenMap.S1.sounds.cap, WEEK1_DATA.quiz.quizs.Q1.screenMap.S1.sounds.cap])} style={{position: "relative", zIndex: "1"}}>여러음원</button>
        <button type="button" onClick={() => playMultiple(WEEK1_DATA.quiz.quizs.Q1.screenMap.S1.sounds.cap)} style={{position: "relative", zIndex: "1"}}>버튼3</button>
        <button type="button" onClick={stopAll} style={{position: "relative", zIndex: "1"}}>정지버튼</button> */}
      </>
    );
  }

  return (
    <>
      <HearMatch data={WEEK1_DATA} />
    </>
  );
}

