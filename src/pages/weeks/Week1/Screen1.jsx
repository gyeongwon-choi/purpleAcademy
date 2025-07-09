import { useEffect, useMemo, useRef, useState } from "react";
import useSize from "@/hooks/useSize";
import { gsap, useGSAP } from "@/libs/gsapSetup";

import styled from "@emotion/styled";

const Screen1 = ({ quizObj, screenId }) => {
  if (screenId !== "S1") return;
  const { resizedWidth, resizedHeight } = useSize();
  const bunnyRef = useRef(null);
  const bunnyImgsRef = useRef([]);
  const startedRef = useRef(false);

  const quizImages = quizObj.images;

  console.log(quizImages);

  useEffect(() => {
    if (!resizedWidth || !resizedHeight || startedRef.current) return;
    startedRef.current = true;

    const tl = gsap.timeline();

    // 위치 이동 애니메이션
    tl.fromTo(
      bunnyRef.current,
      { x: resizedWidth * -0.2 },
      {
        x: resizedWidth * 0.01,
        duration: 2,
        ease: "linear",
      }
    );

    // 걷는 모션 애니메이션
    tl.to({},
      {
        duration: 2,
        onUpdate: function () {
          const frameIndex = Math.floor(this.time() / 0.12) % 3;
          bunnyImgsRef.current.forEach((img, idx) => {
            if (img) {
              img.style.opacity = idx === frameIndex ? "1" : "0";
            }
          });
        },
      },
      "-=2"
    );

    // 긁적이기 애니메이션
    tl.to({}, {
      duration: 2,
      onUpdate: function () {
        const frameIndex = Math.floor(this.time() / 0.3) % 2;
        bunnyImgsRef.current.forEach((img, idx) => {
          if (img) {
            img.style.opacity = idx === 3 + frameIndex ? "1" : "0";
          }
        });
      },
    });

  }, [resizedWidth, resizedHeight]);

  // 보기 나타나는 순서 (공통1)
  const randomPositions = useMemo(() => {
    const shuffled = ["pos-1", "pos-2", "pos-3"].sort(() => Math.random() - 0.5);
    return shuffled;
  }, []);

  return (
    <>
      <Bunny
        resizedWidth={resizedWidth}
        resizedHeight={resizedHeight}
        ref={bunnyRef}
      >
        <img
          ref={(el) => (bunnyImgsRef.current[0] = el)}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s1_char_move_1.png`}
          alt=""
          style={{ opacity: 0 }}
        />
        <img
          ref={(el) => (bunnyImgsRef.current[1] = el)}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s1_char_move_2.png`}
          alt=""
          style={{ opacity: 0 }}
        />
        <img
          ref={(el) => (bunnyImgsRef.current[2] = el)}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s1_char_move_3.png`}
          alt=""
          style={{ opacity: 0 }}
        />

        <img
          ref={(el) => (bunnyImgsRef.current[3] = el)}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s1_char_question_1.png`}
          alt=""
          style={{ opacity: 0 }}
        />
        <img
          ref={(el) => (bunnyImgsRef.current[4] = el)}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/s1_char_question_2.png`}
          alt=""
          style={{ opacity: 0 }}
        />
      </Bunny>

      <AnswerBox resizedWidth={resizedWidth} resizedHeight={resizedHeight} pos={randomPositions[0]}>
        <AnswerBg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/answerBg_big.png`}
          alt=""
        />
        <AnswerImg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={quizImages[0].src}
          alt=""
        />
        <TreasureImg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/treasure.png`}
          alt=""
        />
        <SpeakerBtn
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/speaker.svg`}
          alt=""
        />
      </AnswerBox>

      <AnswerBox resizedWidth={resizedWidth} resizedHeight={resizedHeight} pos={randomPositions[1]}>
        <AnswerBg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/answerBg_big.png`}
          alt=""
        />
        <AnswerImg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={quizImages[1].src}
          alt=""
        />
        <TreasureImg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/treasure.png`}
          alt=""
        />
        <SpeakerBtn
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/speaker.svg`}
          alt=""
        />
      </AnswerBox>

      <AnswerBox resizedWidth={resizedWidth} resizedHeight={resizedHeight} pos={randomPositions[2]}>
        <AnswerBg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/answerBg_big.png`}
          alt=""
        />
        <AnswerImg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={quizImages[2].src}
          alt=""
        />
        <TreasureImg
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/treasure.png`}
          alt=""
        />
        <SpeakerBtn
          resizedWidth={resizedWidth} resizedHeight={resizedHeight}
          src={`${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity/speaker.svg`}
          alt=""
        />
      </AnswerBox>
    </>
  );
};

export default Screen1;

const Bunny = styled.div((props) => ({
  width: `${props.resizedWidth * 0.15}px`,
  position: "absolute",
  left: `${props.resizedWidth * 0.01}px`,
  top: `${props.resizedHeight * 0.55}px`,

  img: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    position: "absolute",
    left: "0px",
    top: "0px",
  },
}));

const AnswerBox = styled.div((props) => {
  const { resizedWidth, resizedHeight, pos } = props;

  const positionMap = {
    "pos-1": {
      left: resizedWidth * 0.06,
      top: resizedHeight * 0.2,
    },
    "pos-2": {
      left: resizedWidth * 0.35,
      top: resizedHeight * 0.2,
    },
    "pos-3": {
      left: resizedWidth * 0.65,
      top: resizedHeight * 0.2,
    },
  };

  const position = positionMap[pos];

  return {
    width: `${resizedWidth * 0.3}px`,
    height: `${resizedHeight * 0.3}px`,
    position: "absolute",
    left: `${position.left}px`,
    top: `${position.top}px`,
  };
});

const AnswerBg = styled.img((props) => ({
  width: "100%",
  height: "100%",
  objectFit: "contain"
}));
const AnswerImg = styled.img((props) => ({
  width: `60%`,
  height: `60%`,
  objectFit: "contain",
  position: "absolute",
  left: `50%`,
  top: `50%`,
  transform: "translate(-50%,-50%)"
}));
const TreasureImg = styled.img((props) => ({
  width: `${props.resizedWidth * 0.1}px`,
  position: "absolute",
  left: `50%`,
  top: `130%`,
  transform: "translate(-50%,0%)",
  zIndex: "1"
}));
const SpeakerBtn = styled.img((props) => ({
  width: `20%`,
  position: "absolute",
  left: `80%`,
  top: `90%`,
  zIndex: "2"
}));