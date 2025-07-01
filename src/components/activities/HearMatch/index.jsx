// 라이브러리
import { useState } from "react";

// 액티비티 공통 컴포넌트
import QuizManager from "@/components/common/activity/QuizManager";
import ScreenManager from "@/components/common/activity/ScreenManager";
import CurrentQuiz from "@/components/common/activity/CurrentQuiz";
import BackgroundContent from "@/components/common/activity/BackgroundContent";
import Content from "@/components/common/activity/Content";
import Question from "@/components/common/activity/Question";
import LinkOut from "@/components/common/activity/LinkOut";
import BtnLanguage from "@/components/common/activity/BtnLanguage";
import ScreenTransitionEffect from "@/components/common/activity/ScreenTransitionEffect";
import QuizTransitionEffect from "@/components/common/activity/QuizTransitionEffect";

// 화면 로직 컴포넌트
import Screens from "@/pages/weeks/Week1/Screens";

// 퀴즈 배경이미지
const backgroundSettingsMap = {
  Q1: {
    backgroundImage: "/images/activity/w2soundMapper/bg_1.png",
    backgroundSize: "auto 110%",
    backgroundPosition: "center",
  },
  Q2: {
    backgroundImage: "/images/activity/w2soundMapper/bg_2.png",
    backgroundSize: "auto 110%",
    backgroundPosition: "center",
  },
  Q3: {
    backgroundImage: "/images/activity/w2soundMapper/bg_3.png",
    backgroundSize: "auto 110%",
    backgroundPosition: "center",
  },
  Q4: {
    backgroundImage: "/images/activity/w2soundMapper/bg_4.png",
    backgroundSize: "auto 110%",
    backgroundPosition: "center",
  },
  Q5: {
    backgroundImage: "/images/activity/w2soundMapper/bg_1.png",
    backgroundSize: "auto 110%",
    backgroundPosition: "center",
  },
  Q6: {
    backgroundImage: "/images/activity/w2soundMapper/bg_2.png",
    backgroundSize: "auto 110%",
    backgroundPosition: "center",
  },
};

export default function HearMatch({ data }) {
  const [isLanguageEnglish, setIsLanguageEnglish] = useState(true);
  const dataObj = data;
  const quizOrder = dataObj.quizOrder;

  const handleClickBtnLanguage = () => {
    setIsLanguageEnglish((prev) => !prev);
  };

  return (
    <>
      <LinkOut to="/">나가기</LinkOut>
      <QuizManager
        dataObj={dataObj}
        renderQuiz={(quizObj, quizId) => {
          const bgSettings =
            backgroundSettingsMap[quizObj.quizId] ||
            backgroundSettingsMap["default"];

          return (
            <>
              <QuizTransitionEffect animationKey={`quiz-${quizId}`} />

              <ScreenManager
                key={`ScreenManager-${quizId}`}
                quizObj={quizObj}
                renderScreen={(
                  screenId,
                  goToNextScreen,
                  goToPrevScreen,
                  goToScreen
                ) => {
                  const screen = quizObj.screenMap[screenId]; // 추가: 현재 화면 데이터
                  //const Component = ScreenComponents[screenId];
                  //if (!Component) return <p>지원되지 않는 화면입니다.</p>;

                  return (
                    <BackgroundContent
                      backgroundImage={bgSettings.backgroundImage}
                      backgroundSize={bgSettings.backgroundSize}
                      backgroundPosition={bgSettings.backgroundPosition}
                    >
                      <ScreenTransitionEffect
                        animationKey={`quiz-${quizId}_screen-${screenId}`}
                      />

                      {screen?.question?.english?.trim() !== "" && (
                        <Question animationKey={screenId}>
                          {isLanguageEnglish
                            ? screen?.question?.english
                            : screen?.question?.korean}
                          <BtnLanguage
                            isLanguageEnglish={isLanguageEnglish}
                            handleClickBtnLanguage={handleClickBtnLanguage}
                          />
                        </Question>
                      )}

                      <Content animationKey={screenId}>
                        <Screens
                          screenId={screenId}
                          quizObj={quizObj}
                          goToNextScreen={goToNextScreen}
                          goToPrevScreen={goToPrevScreen}
                          goToScreen={goToScreen}
                        />

                        <CurrentQuiz
                          quizIndex={quizOrder.indexOf(quizId) + 1}
                          quizLength={quizOrder.length}
                        />
                      </Content>
                    </BackgroundContent>
                  );
                }}
              />
            </>
          );
        }}
      />
    </>
  );
}
