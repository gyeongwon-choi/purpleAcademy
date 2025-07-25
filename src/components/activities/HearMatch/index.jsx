// 라이브러리
import { useState } from "react";

// 액티비티 공통 컴포넌트
import QuizManager from "@/components/common/activity/QuizManager";
import ScreenManager from "@/components/common/activity/ScreenManager";
import CurrentQuiz from "@/components/common/activity/CurrentQuiz";
import BackgroundContent from "@/components/common/activity/BackgroundContent";
import Content from "@/components/common/activity/Content";
import Question from "@/components/common/activity/Question";
import BtnLanguage from "@/components/common/activity/BtnLanguage";
import ScreenTransitionEffect from "@/components/common/activity/ScreenTransitionEffect";
import QuizTransitionEffect from "@/components/common/activity/QuizTransitionEffect";

export default function HearMatch({ data, audioControls, ScreensComponent, recordControls }) {
  const [isLanguageEnglish, setIsLanguageEnglish] = useState(true);
  const dataObj = data;
  const quizOrder = dataObj.quiz.order;
  const currentQuizObj = dataObj.quiz.currentQuizObj;

  const handleClickBtnLanguage = () => {
    setIsLanguageEnglish((prev) => !prev);
  };

  return (
    <>
      <QuizManager
        dataObj={dataObj}
        renderQuiz={(quizObj, quizId, goToNextQuiz, goToPrevQuiz, goToQuiz, effectSounds) => {
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
                  const screen = quizObj.screenMap[screenId];

                  return (
                    <BackgroundContent
                      backgroundImage={quizObj.bg}
                      backgroundSize={"cover"}
                      backgroundPosition={"center"}
                    >
                      <ScreenTransitionEffect
                        animationKey={`quiz-${quizId}_screen-${screenId}`}
                      />

                      {screen?.question?.english?.trim() !== "" && (
                        <>
                          <Question animationKey={screenId}>
                            {isLanguageEnglish
                              ? screen?.question?.english
                              : screen?.question?.korean}
                            <BtnLanguage
                              isLanguageEnglish={isLanguageEnglish}
                              handleClickBtnLanguage={handleClickBtnLanguage}
                            />
                          </Question>
                        </>
                      )}

                      <Content animationKey={screenId}>
                        <ScreensComponent
                          quizObj={quizObj}
                          screenId={screenId}
                          quizControls={{
                            goToNextQuiz,
                            goToPrevQuiz,
                            goToQuiz
                          }}
                          screenControls={{
                            goToNextScreen,
                            goToPrevScreen,
                            goToScreen
                          }}
                          audioControls={audioControls}
                          effectSounds={effectSounds}
                          quizOrder={quizOrder}
                          currentQuizObj={currentQuizObj}
                          recordControls={recordControls}
                        />

                        {/* <CurrentQuiz
                          quizIndex={quizOrder.indexOf(quizId) + 1}
                          quizLength={quizOrder.length}
                          currentQuizObj={currentQuizObj}
                        /> */}
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
