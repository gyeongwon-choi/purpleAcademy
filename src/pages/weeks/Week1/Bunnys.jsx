import { useEffect, useRef } from "react";
import useSize from "@/hooks/useSize";
import useUiInteractionEnableStore from '@/store/useUiInteractionEnableStore';
import { gsap, useGSAP } from "@/libs/gsapSetup";


import styled from "@emotion/styled";

const ACTIVITY_IMG_PATH = `${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity`;

const Bunnys = ({
  quizObj,
  screenId,
  audioControls,
  isWrong,
  isCorrect,
  setIsWrong,
  setIsCorrect,
  isComplete,
  recordControls
}) => {
  const { resizedWidth, resizedHeight } = useSize();
  const { setInteractionEnabled } = useUiInteractionEnableStore();
  const { isRecording } = recordControls;
  
  const bunnyRef = useRef(null);
  const bunnyImgsRef = useRef({
    s1: { move: [], scrab: [] },
    s2: null,
    s3: null,
    s4: {
      default: null,
      recording: null,
      complete: null,
    },
    wrong: null,
    correct: null,
  });
  const bunnyMoveRef = useRef(false);
  const { playSingle } = audioControls;

  const quizSampleSound = quizObj.screenMap[screenId].soundExample;

  useEffect(() => {
    if (
      !resizedWidth ||
      !resizedHeight ||
      screenId !== "S1" ||
      bunnyMoveRef.current
    )
      return;

    bunnyMoveRef.current = true;

    const tl = gsap.timeline();

    // s1 위치 이동
    tl.fromTo(
      bunnyRef.current,
      { x: resizedWidth * -0.2 },
      { x: resizedWidth * 0.01, duration: 2, ease: "linear" }
    );

    // s1 걷는 모션
    tl.to(
      {},
      {
        duration: 2,
        onUpdate() {
          const frameIndex = Math.floor(this.time() / 0.22) % 3;
          hideAllImages();
          bunnyImgsRef.current.s1.move.forEach((img, idx) => {
            if (img) img.classList.toggle("active", idx === frameIndex);
          });
        },
      },
      "-=2"
    );

    // s1 긁적이기 모션
    tl.to(
      {},
      {
        duration: 2,
        onStart() {
          setInteractionEnabled(false);
        },
        onUpdate() {
          const frameIndex = Math.floor(this.time() / 0.4) % 2;
          bunnyImgsRef.current.s1.move.forEach((img) => {
            if (img) img.classList.remove("active");
          });
          bunnyImgsRef.current.s1.scrab.forEach((img, idx) => {
            if (img) img.classList.toggle("active", idx === frameIndex);
          });
        },
        onComplete() {
          setInteractionEnabled(true);
        },
      }
    );
  }, [screenId, resizedWidth, resizedHeight]);

  // 화면마다 버니 기본 이미지 보여주기
  useEffect(() => {
    if (isWrong || isCorrect) return; // wrong/correct 상태일 땐 기본 이미지 보여주지 않음

    hideAllImages();

    if (screenId === "S1" && bunnyMoveRef.current) {
      bunnyImgsRef.current.s1.scrab[1]?.classList.add("active");
    } else if (screenId === "S2") {
      bunnyImgsRef.current.s2?.classList.add("active");
    } else if (screenId === "S3") {
      bunnyImgsRef.current.s3?.classList.add("active");
    } else if (screenId === "S4") {
      bunnyImgsRef.current.s4.default?.classList.add("active");
    }
  }, [screenId, isWrong, isCorrect]);

  // 문제 틀렸을 때
  useEffect(() => {
    if (isWrong) {
      hideAllImages(); // 초기 상태 숨김

      bunnyImgsRef.current.wrong?.classList.add("active");

      // 1초 뒤에 다시 원래 문제 이미지로 복귀
      const resetTimeout = setTimeout(() => {
        setIsWrong(false); // false로 바뀌면, screenId에 맞는 기본 이미지 다시 표시됨
      }, 1000);

      // 타이머 클린업
      return () => clearTimeout(resetTimeout);
    }
  }, [isWrong]);

  // 문제 맞았을 때
  useEffect(() => {
    if (isCorrect) {
      hideAllImages();

      bunnyImgsRef.current.correct?.classList.add("active");

      const resetTimeout = setTimeout(() => {
        setIsCorrect(false);
      }, 1000);

      return () => clearTimeout(resetTimeout);
    }
  }, [isCorrect]);

  // S1 화면 모션 시작 플래그 초기화
  useEffect(() => {
    if (screenId !== "S1") {
      bunnyMoveRef.current = false;
    }
  }, [screenId]);

  // 버니 레코딩
  useEffect(() => {
    if (screenId !== "S4") return;

    hideAllImages();

    if (isComplete) {
      bunnyImgsRef.current.s4.complete?.classList.add("active");
    } else if (isRecording) {
      bunnyImgsRef.current.s4.recording?.classList.add("active");
    } else {
      bunnyImgsRef.current.s4.default?.classList.add("active");
    }
  }, [screenId, isRecording, isComplete]);

  // 모든 이미지 숨김
  const hideAllImages = () => {
    const refs = bunnyImgsRef.current;
    [
      ...refs.s1.move,
      ...refs.s1.scrab,
      refs.s2,
      refs.s3,
      refs.s4.default,
      refs.s4.recording,
      refs.wrong,
      refs.correct,
    ].forEach((img) => {
      if (img) {
        img.classList.remove("active");
        img.classList.remove("hide");
      }
    });
  };

  return (
    <>
      <Bunny
        resizedWidth={resizedWidth}
        resizedHeight={resizedHeight}
        ref={bunnyRef}
        screenId={screenId}
        onClick={() => {
          if (screenId === "S1") playSingle(quizSampleSound.src);
        }}
      >
        {/* s1 move 이미지 */}
        <img
          ref={(el) => (bunnyImgsRef.current.s1.move[0] = el)}
          src={`${ACTIVITY_IMG_PATH}/s1_char_move_1.png`}
          alt=""
        />
        <img
          ref={(el) => (bunnyImgsRef.current.s1.move[1] = el)}
          src={`${ACTIVITY_IMG_PATH}/s1_char_move_2.png`}
          alt=""
        />
        <img
          ref={(el) => (bunnyImgsRef.current.s1.move[2] = el)}
          src={`${ACTIVITY_IMG_PATH}/s1_char_move_3.png`}
          alt=""
        />

        {/* s1 scrab 이미지 */}
        <img
          ref={(el) => (bunnyImgsRef.current.s1.scrab[0] = el)}
          src={`${ACTIVITY_IMG_PATH}/s1_char_question_1.png`}
          alt=""
        />
        <img
          ref={(el) => (bunnyImgsRef.current.s1.scrab[1] = el)}
          src={`${ACTIVITY_IMG_PATH}/s1_char_question_2.png`}
          alt=""
        />

        {/* s2 이미지 */}
        <img
          ref={(el) => (bunnyImgsRef.current.s2 = el)}
          src={`${ACTIVITY_IMG_PATH}/s2_char.png`}
          alt=""
        />

        {/* s3 이미지 */}
        <img
          ref={(el) => (bunnyImgsRef.current.s3 = el)}
          src={`${ACTIVITY_IMG_PATH}/s3_char.png`}
          alt=""
          className="active"
        />

        {/* s4 기본 이미지 */}
        <img
          ref={(el) => (bunnyImgsRef.current.s4.default = el)}
          src={`${ACTIVITY_IMG_PATH}/s4_char.png`}
          alt=""
          className="active"
        />
        {/* s4 녹음중 이미지 */}
        <img
          ref={(el) => (bunnyImgsRef.current.s4.recording = el)}
          src={`${ACTIVITY_IMG_PATH}/s4_char_recording.png`}
          alt=""
        />
        {/* s4 완료 이미지 */}
        <img
          ref={(el) => (bunnyImgsRef.current.s4.complete = el)}
          src={`${ACTIVITY_IMG_PATH}/s4_char_complete.png`}
          alt=""
        />

        {/* wrong 이미지, 화면마다 버니위치가 달라서 wrong이미지 다름 */}
        <img
          ref={(el) => (bunnyImgsRef.current.wrong = el)}
          src={`${ACTIVITY_IMG_PATH}/${screenId.toLowerCase()}_char_wrong.png`}
          alt=""
        />

        {/* correct 이미지, 화면마다 버니위치가 달라서 correct이미지 다름 */}
        <img
          ref={(el) => (bunnyImgsRef.current.correct = el)}
          src={`${ACTIVITY_IMG_PATH}/${screenId.toLowerCase()}_char_correct.png`}
          alt=""
        />
      </Bunny>
    </>
  );
};

export default Bunnys;

const Bunny = styled.div((props) => {
  const { resizedWidth, resizedHeight, screenId } = props;

  // 기본 위치
  let left = resizedWidth * 0.001;
  let top = resizedHeight * 0.55;

  // S4 위치 조정
  if (screenId === "S4") {
    left = resizedWidth * 0.71;
    top = resizedHeight * 0.55;
  }

  return {
    width: `${resizedWidth * 0.15}px`,
    position: "absolute",
    left: `${left}px`,
    top: `${top}px`,
    cursor: "pointer",
    zIndex: 1,

    img: {
      width: "100%",
      height: "auto",
      objectFit: "contain",
      position: "absolute",
      left: "0px",
      top: "0px",
      opacity: 0,
    },

    "img.active": {
      opacity: 1,
    },
    "img.hide": {
      opacity: 0,
    },
  };
});
