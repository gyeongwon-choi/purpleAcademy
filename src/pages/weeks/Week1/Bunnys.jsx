import { useEffect, useMemo, useRef, useState } from "react";
import useSize from "@/hooks/useSize";
import { gsap, useGSAP } from "@/libs/gsapSetup";

import styled from "@emotion/styled";

const Bunnys = ({ quizObj, screenId, quizControls, screenControls, audioControls, effectSounds, isWrong, isCorrect, setIsWrong, setIsCorrect }) => {
  if (!["S1", "S2", "S3", "S4"].includes(screenId)) return;
  const { resizedWidth, resizedHeight } = useSize();
  const bunnyRef = useRef(null);
  const bunnyImgsRef = useRef({
    s1: { move: [], scrab: [] },
    s2: null,
    s3: null,
    s4: {
      default: null,
      recording: null,
    },
    wrong: null,
    correct: null,
  });
  const startedRef = useRef(false);
  const { goToNextQuiz, goToPrevQuiz, goToQuiz } = quizControls;
  const { goToNextScreen, goToPrevScreen, goToScreen } = screenControls;
  const { playSingle, playMultiple, playInSequence, stopAll } = audioControls;

  const quizImages = quizObj.images;
  const quizSampleSound = quizObj.screenMap[screenId].soundExample;

  useEffect(() => {
    if (!resizedWidth || !resizedHeight || startedRef.current) return;

    startedRef.current = true;

    const tl = gsap.timeline();

    if (screenId === "S1") {
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
            const frameIndex = Math.floor(this.time() / 0.12) % 3;
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
          onUpdate() {
            const frameIndex = Math.floor(this.time() / 0.3) % 2;
            bunnyImgsRef.current.s1.move.forEach((img) => {
              if (img) img.classList.remove("active");
            });
            bunnyImgsRef.current.s1.scrab.forEach((img, idx) => {
              if (img) img.classList.toggle("active", idx === frameIndex);
            });
          },
        }
      );
    } else if (screenId === "S2") {
      // s2 특정 이미지 보이기 (예: opacity 1, 나머지는 숨기기)
      if (bunnyImgsRef.current.s2) {
        gsap.set(bunnyImgsRef.current.s2, { opacity: 1 });
      }
      // s1 이미지는 숨기기
      bunnyImgsRef.current.s1.move.forEach((img) => {
        if (img) gsap.set(img, { opacity: 0 });
      });
      bunnyImgsRef.current.s1.scrab.forEach((img) => {
        if (img) gsap.set(img, { opacity: 0 });
      });
    } else if (screenId === "S3") {
      // s3 이미지 보이기 (bunnyImgsRef.current.s3)
      if (bunnyImgsRef.current.s3) {
        gsap.set(bunnyImgsRef.current.s3, { opacity: 1 });
      }
      // s1 이미지 숨기기 (필요시)
      bunnyImgsRef.current.s1.move.forEach((img) => {
        if (img) gsap.set(img, { opacity: 0 });
      });
      bunnyImgsRef.current.s1.scrab.forEach((img) => {
        if (img) gsap.set(img, { opacity: 0 });
      });
    } else if (screenId === "S4") {
      // 기본(default) 이미지 보여주기
      if (bunnyImgsRef.current.s4.default) {
        gsap.set(bunnyImgsRef.current.s4.default, { opacity: 1 });
      }
      if (bunnyImgsRef.current.s4.recording) {
        gsap.set(bunnyImgsRef.current.s4.recording, { opacity: 0 });
      }
    }

    // wrong/correct는 별도 state에 따라 다르게 보여주기
  }, [screenId, resizedWidth, resizedHeight]);

  useEffect(() => {
    if (isWrong) {
      if (bunnyImgsRef.current.wrong) {
        gsap.to(bunnyImgsRef.current.wrong, { opacity: 1 });
      }
    } else {
      if (bunnyImgsRef.current.wrong) {
        gsap.to(bunnyImgsRef.current.wrong, { opacity: 0 });
      }
    }
  }, [isWrong]);

  useEffect(() => {
    if (isCorrect) {
      if (bunnyImgsRef.current.correct) {
        gsap.to(bunnyImgsRef.current.correct, { opacity: 1 });
      }
    } else {
      if (bunnyImgsRef.current.correct) {
        gsap.to(bunnyImgsRef.current.correct, { opacity: 0 });
      }
    }
  }, [isCorrect]);

  return (
    <>
      <Bunny
        resizedWidth={resizedWidth}
        resizedHeight={resizedHeight}
        ref={bunnyRef}
        onClick={() => {
          if (screenId === "S1") playSingle(quizSampleSound.src);
        }}
      >
        {/* s1 move 이미지 */}
        <img
          ref={(el) => (bunnyImgsRef.current.s1.move[0] = el)}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s1_char_move_1.png`}
          alt=""
        />
        <img
          ref={(el) => (bunnyImgsRef.current.s1.move[1] = el)}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s1_char_move_2.png`}
          alt=""
        />
        <img
          ref={(el) => (bunnyImgsRef.current.s1.move[2] = el)}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s1_char_move_3.png`}
          alt=""
        />

        {/* s1 scrab 이미지 */}
        <img
          ref={(el) => (bunnyImgsRef.current.s1.scrab[0] = el)}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s1_char_question_1.png`}
          alt=""
        />
        <img
          ref={(el) => (bunnyImgsRef.current.s1.scrab[1] = el)}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s1_char_question_2.png`}
          alt=""
        />

        {/* wrong, correct 이미지 */}
        <img
          ref={(el) => (bunnyImgsRef.current.wrong = el)}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/char_wrong.png`}
          alt=""
        />
        <img
          ref={(el) => (bunnyImgsRef.current.correct = el)}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/char_correct.png`}
          alt=""
        />
      </Bunny>
    </>
  );
};

export default Bunnys;

const Bunny = styled.div((props) => ({
  width: `${props.resizedWidth * 0.15}px`,
  position: "absolute",
  left: `${props.resizedWidth * 0.001}px`,
  top: `${props.resizedHeight * 0.55}px`,
  cursor: "pointer",

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
    opacity: 1,
  },

}));
