import useSize from "@/hooks/useSize";
import { gsap, useGSAP } from "@/libs/gsapSetup";

import styled from "@emotion/styled";
import { useEffect, useRef } from "react";

const Screen1 = ({ quizObj, screenId }) => {
  if(screenId !== "S1") return;
  const { resizedWidth, resizedHeight } = useSize();
  const bunnyRef = useRef(null);
  const bunnyImgsRef = useRef([]);
  const walkIntervalRef = useRef(null);
  const scratchIntervalRef = useRef(null);
  const startedRef = useRef(false);

  console.log(quizObj);
  const quizImages = quizObj.images;

  // 걷는 애니메이션
  const startWalkAnimation = () => {
    let frame = 0;
    walkIntervalRef.current = setInterval(() => {
      bunnyImgsRef.current.forEach((img, idx) => {
        img.style.opacity = idx === frame ? "1" : "0";
      });
      frame = (frame + 1) % 3;
    }, 120);
  };

  const stopWalkAnimation = () => {
    clearInterval(walkIntervalRef.current);
    bunnyImgsRef.current.forEach((img, idx) => {
      img.style.opacity = idx === 1 ? "1" : "0"; // 중간 프레임 유지
    });

    // 걷기 멈춘 후 긁적이기 애니메이션 시작
    startScratchAnimation();
  };

  // 긁적이는 애니메이션
  const startScratchAnimation = () => {
    let frame = 0;
    let count = 0;

    scratchIntervalRef.current = setInterval(() => {
      bunnyImgsRef.current.forEach((img, idx) => {
        // 긁적 프레임만 표시 (index 3, 4)
        img.style.opacity = idx === 3 + frame ? "1" : "0";
      });

      frame = (frame + 1) % 2;
      count += 1;

      if (count >= Math.ceil(2000 / 300)) {
        // 약 2초간 반복
        clearInterval(scratchIntervalRef.current);
        // 멈출 때 마지막 프레임 유지 (필요 시 바꿔도 됨)
        bunnyImgsRef.current.forEach((img, idx) => {
          img.style.opacity = idx === 3 ? "1" : "0";
        });
      }
    }, 300);
  };

  useEffect(() => {
    if (!resizedWidth || !resizedHeight || startedRef.current) return;

    startedRef.current = true;

    gsap.fromTo(
      bunnyRef.current,
      { x: -resizedWidth * 0 },
      {
        x: resizedWidth * 0.2,
        duration: 3,
        ease: "power1.inOut",
        onStart: startWalkAnimation,
        onComplete: stopWalkAnimation,
      }
    );
  }, [resizedWidth, resizedHeight]);

  return (
    <>
      <Bunny
        resizedWidth={resizedWidth}
        resizedHeight={resizedHeight}
        ref={bunnyRef}
      >
        <img
          ref={(el) => (bunnyImgsRef.current[0] = el)}
          src="/images/week/week1/activity/s1_char_move_1.png"
          alt=""
          style={{ opacity: 0 }}
        />
        <img
          ref={(el) => (bunnyImgsRef.current[1] = el)}
          src="/images/week/week1/activity/s1_char_move_2.png"
          alt=""
          style={{ opacity: 0 }}
        />
        <img
          ref={(el) => (bunnyImgsRef.current[2] = el)}
          src="/images/week/week1/activity/s1_char_move_3.png"
          alt=""
          style={{ opacity: 0 }}
        />

        <img
          ref={(el) => (bunnyImgsRef.current[3] = el)}
          src="/images/week/week1/activity/s1_char_question_1.png"
          alt=""
          style={{ opacity: 0 }}
        />
        <img
          ref={(el) => (bunnyImgsRef.current[4] = el)}
          src="/images/week/week1/activity/s1_char_question_2.png"
          alt=""
          style={{ opacity: 0 }}
        />
      </Bunny>
      
      <AnswerBox resizedWidth={resizedWidth} resizedHeight={resizedHeight}>
        <AnswerBg 
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src="/images/week/week1/activity/answerBg_big.png"
          alt=""
        />
        <AnswerImg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={quizImages.cap}
          alt=""
        />
        <TreasureImg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src="/images/week/week1/activity/treasure.png"
          alt=""
        />
        <SpeakerBtn
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src="/images/week/week1/activity/speaker.svg"
          alt=""
        />
      </AnswerBox>
    </>
  );
};

export default Screen1;

const Bunny = styled.div((props) => ({
  width: `${props.resizedWidth * 0.2}px`,
  position: "absolute",
  left: `${props.resizedWidth * 0 - props.resizedWidth * 0.2}px`,
  top: `${props.resizedHeight * 0.45}px`,

  img: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    position: "absolute",
    left: "0px",
    top: "0px",
  },
}));

const AnswerBox = styled.div((props) => ({
  width: `${props.resizedWidth * 0.2}px`,
  height: `${props.resizedHeight * 0.2}px`,
  position: "absolute",
  left: `${props.resizedWidth * 0.2}px`,
  top: `${props.resizedHeight * 0.45}px`,

  img: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
  },
}));

const AnswerBg = styled.img((props) => ({
  /* width: `${props.resizedWidth * 0.2}px`,
  height: `${props.resizedHeight * 0.2}px`,
  position: "absolute",
  left: `${props.resizedWidth * 0.2}px`,
  top: `${props.resizedHeight * 0.45}px`, */
}));
const AnswerImg = styled.img((props) => ({
  width: `${props.resizedWidth * 0.2}px`,
  position: "absolute",
  left: `${props.resizedWidth * 0.2}px`,
  top: `${props.resizedHeight * 0.45}px`,
}));
const TreasureImg = styled.img((props) => ({
  width: `${props.resizedWidth * 0.2}px`,
  position: "absolute",
  left: `${props.resizedWidth * 0.2}px`,
  top: `${props.resizedHeight * 0.45}px`,
}));
const SpeakerBtn = styled.img((props) => ({
  width: `${props.resizedWidth * 0.2}px`,
  position: "absolute",
  left: `${props.resizedWidth * 0.2}px`,
  top: `${props.resizedHeight * 0.45}px`,
}));