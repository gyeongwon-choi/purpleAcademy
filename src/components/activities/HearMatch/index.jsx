// 라이브러리
import { useState } from "react";

// 훅
import useIntroScreen from "@/hooks/useIntroScreen";

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

// 액티비티 전용 컴포넌트
import ScreenComponents from "@/components/activities/HearMatch/ScreenComponents";
import ThumbNail from "@/components/activities/HearMatch/ThumbNail";
import GroupStamps from "@/components/activities/HearMatch/GroupStamps";
import GroupCap from "@/components/activities/HearMatch/GroupCap";

// 스테이지 & 액티비티 배경이미지
const backgroundSettingsMap = {
  "1_1": { // quizId + screenId
    backgroundImage: "/images/weeks/w2soundMapper/test.png",
    backgroundSize: "auto 110%",
    backgroundPosition: "center",
  },
  "Q1": { // quizId
    backgroundImage: "/images/weeks/w2soundMapper/bg_1.png",
    backgroundSize: "auto 110%",
    backgroundPosition: "center",
  },
  "Q2": {
    backgroundImage: "/images/weeks/w2soundMapper/bg_2.png",
    backgroundSize: "auto 110%",
    backgroundPosition: "center",
  },
  "Q3": {
    backgroundImage: "/images/weeks/w2soundMapper/bg_3.png",
    backgroundSize: "auto 110%",
    backgroundPosition: "center",
  },
  "Q4": {
    backgroundImage: "/images/weeks/w2soundMapper/bg_4.png",
    backgroundSize: "auto 110%",
    backgroundPosition: "center",
  },
  "Q5": {
    backgroundImage: "/images/weeks/w2soundMapper/bg_4.png",
    backgroundSize: "auto 110%",
    backgroundPosition: "center",
  },
  "Q6": {
    backgroundImage: "/images/weeks/w2soundMapper/bg_4.png",
    backgroundSize: "auto 110%",
    backgroundPosition: "center",
  },
  "default": {
    backgroundImage: "/images/weeks/w2soundMapper/default.png",
    backgroundSize: "auto 110%",
    backgroundPosition: "center",
  }
};

export default function HearMatch({ data }) {
  const { isIntroVisible, endIntro } = useIntroScreen();
  const [isLanguageEnglish, setIsLanguageEnglish] = useState(true);
  const quizObj = data;
  const quizOrder = quizObj.quizOrder;

  const handleClickBtnLanguage = () => {
    setIsLanguageEnglish(prev => !prev);
  }

  if (isIntroVisible) {
    return (
      <BackgroundContent
        backgroundImage="/images/weeks/w2soundMapper/thumbnail.png"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <ThumbNail endIntro={endIntro} />
      </BackgroundContent>
    );
  }

  return (
    <>
      <LinkOut to="/">나가기</LinkOut>
      <QuizManager
        quizObj={quizObj}
        renderQuiz={(quizData, quizId) => {
          const bgSettings = backgroundSettingsMap[quizData.quizId] || backgroundSettingsMap["default"];

          return (
            <>
              <QuizTransitionEffect animationKey={`quiz-${quizId}`} />

              <h2>이번 퀴즈 단어: {quizData.word}</h2>

              <ScreenManager
                key={`ScreenManager-${quizId}`}
                quizData={quizData}
                renderScreen={(screenId, goToNextScreen, goToPrevScreen, goToScreen) => {
                  const screen = quizData.screenMap[screenId]; // 추가: 현재 화면 데이터
                  const Component = ScreenComponents[screenId];
                  if (!Component) return <p>지원되지 않는 화면입니다.</p>;

                  // 그룹 컴포넌트 조건에 맞게 변경 필요시 수정
                  const isGroupCap = ["S2", "S3", "S4", "S5", "S6-1", "S6-2"].includes(screenId);
                  const isGroupStamps = ["S3", "S4", "S5", "S6-1"].includes(screenId);

                  return (
                    <BackgroundContent
                      backgroundImage={bgSettings.backgroundImage}
                      backgroundSize={bgSettings.backgroundSize}
                      backgroundPosition={bgSettings.backgroundPosition}
                    >
                      <ScreenTransitionEffect animationKey={`quiz-${quizId}_screen-${screenId}`} />

                      {screen?.english?.trim() !== "" && (
                        <Question animationKey={screenId}>
                          {isLanguageEnglish ? screen.english : screen.korean}
                          <BtnLanguage
                            isLanguageEnglish={isLanguageEnglish}
                            handleClickBtnLanguage={handleClickBtnLanguage}
                          />
                        </Question>
                      )}

                      <Content animationKey={screenId}>
                        {isGroupStamps && (
                          <GroupStamps
                            quizData={quizData}
                            screenId={screenId}
                            goToNextScreen={goToNextScreen}
                            goToPrevScreen={goToPrevScreen}
                            goToScreen={goToScreen}
                          />
                        )}

                        {isGroupCap && (
                          <GroupCap
                            quizData={quizData}
                            screenId={screenId}
                            goToNextScreen={goToNextScreen}
                            goToPrevScreen={goToPrevScreen}
                            goToScreen={goToScreen}
                          />
                        )}

                        <Component
                          quizData={quizData}
                          screenId={screenId}
                          goToNextScreen={goToNextScreen}
                          goToPrevScreen={goToPrevScreen}
                          goToScreen={goToScreen}
                        />

                        <CurrentQuiz quizIndex={quizOrder.indexOf(quizId) + 1} quizLength={quizOrder.length} />
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
