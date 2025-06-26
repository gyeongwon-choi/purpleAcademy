// 라이브러리
import { useState } from "react";
import styled from "@emotion/styled";

// 훅
import useIntroScreen from "@/hooks/useIntroScreen";

// 데이터
import SOUNDMAPPER_DATA from "./data.json";

// 주차 공통 컴포넌트
import StageManager from "@/components/common/weeks/StageManager";
import ActivityManager from "@/components/common/weeks/ActivityManager";
import CurrentStage from "@/components/common/weeks/CurrentStage";
import BackgroundContent from "@/components/common/weeks/BackgroundContent";
import Content from "@/components/common/weeks/Content";
import Question from "@/components/common/weeks/Question";
import LinkOut from "@/components/common/weeks/LinkOut";
import BtnLanguage from "@/components/common/weeks/BtnLanguage";
import ActivityTransitionEffect from "@/components/common/weeks/ActivityTransitionEffect";
import StageTransitionEffect from "@/components/common/weeks/StageTransitionEffect";

// 주차 컴포넌트
import ActivityComponents from "@/components/weeks/W2SoundMapper/ActivityComponents";
import ThumbNail from "@/components/weeks/w2soundMapper/ThumbNail";
import GroupStamps from "@/components/weeks/w2soundMapper/GroupStamps";
import GroupCap from "@/components/weeks/w2soundMapper/GroupCap";

// 스테이지 & 액티비티 배경이미지
const backgroundSettingsMap = {
  "1_1": { // stageId + activityId
    backgroundImage: "/images/weeks/w2soundMapper/test.png",
    backgroundSize: "auto 110%",
    backgroundPosition: "center",
  },
  "1": { // stageId
    backgroundImage: "/images/weeks/w2soundMapper/bg_1.png",
    backgroundSize: "auto 110%",
    backgroundPosition: "center",
  },
  "2": {
    backgroundImage: "/images/weeks/w2soundMapper/bg_2.png",
    backgroundSize: "auto 110%",
    backgroundPosition: "center",
  },
  "3": {
    backgroundImage: "/images/weeks/w2soundMapper/bg_3.png",
    backgroundSize: "auto 110%",
    backgroundPosition: "center",
  },
  "4": {
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

export default function W2_SoundMapper() {
  const { isIntroVisible, endIntro } = useIntroScreen();
  const [isLanguageEnglish, setIsLanguageEnglish] = useState(true);
  const stages = SOUNDMAPPER_DATA.stages;

  const handleClickBtnLanguage = () => {
    setIsLanguageEnglish(prev => !prev);
  }

  // 인트로
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

  // 주차
  return (
    <>
      <LinkOut to="/">나가기</LinkOut>
      <StageManager
        stages={stages}
        renderStage={(stageData, stageIndex) => {
          const bgSettings = backgroundSettingsMap[stageData.stageId] || backgroundSettingsMap["default"];

          return (
            <>
              {/* 스테이지전환 효과 */}
              <StageTransitionEffect animationKey={`stage-${stageIndex+1}`} />

              <h2>이번 스테이지 단어: {stageData.word}</h2>

              <ActivityManager
                key={`ActivityManager-${stageIndex}`}
                activityFlow={stageData.activities.map(a => a.id)}
                stageData={stageData}
                renderActivity={(activityId, goToNextActivity, goToPrevActivity, goToActivity) => {
                  const Component = ActivityComponents[activityId];
                  if (!Component) return <p>지원되지 않는 액티비티입니다.</p>;

                  const activity = stageData.activities.find(a => a.id === activityId);

                  const isGroupCap = ["2", "3", "4", "5", "6-1", "6-2"].includes(activityId);
                  const isGroupStamps = ["3", "4", "5", "6-1"].includes(activityId);

                  return (
                    /* 배경 */
                    <BackgroundContent
                      backgroundImage={bgSettings.backgroundImage}
                      backgroundSize={bgSettings.backgroundSize}
                      backgroundPosition={bgSettings.backgroundPosition}
                    >
                      
                      {/* 액티비티전환 효과 */}
                      <ActivityTransitionEffect animationKey={`stage-${stageIndex+1}_activity-${activityId}`} />

                      {activity?.english?.trim() !== "" && (
                        /* 지문 */
                        <Question animationKey={activityId}>
                          {isLanguageEnglish ? activity.english : activity.korean}
                          <BtnLanguage
                            isLanguageEnglish={isLanguageEnglish}
                            handleClickBtnLanguage={handleClickBtnLanguage}
                          />
                        </Question>
                      )}

                      {/* 컨텐츠 영역 */}
                      <Content animationKey={activityId}>
                        {/* 액티비티 공통 GroupStamps */}
                        {isGroupStamps && (
                          <GroupStamps
                            stageData={stageData}
                            activityId={activityId}
                            goToNextActivity={goToNextActivity}
                            goToPrevActivity={goToPrevActivity}
                            goToActivity={goToActivity}
                          />
                        )}

                        {/* 액티비티 공통 GroupCap */}
                        {isGroupCap && (
                          <GroupCap
                            stageData={stageData}
                            activityId={activityId}
                            goToNextActivity={goToNextActivity}
                            goToPrevActivity={goToPrevActivity}
                            goToActivity={goToActivity}
                          />
                        )}

                        {/* 개별 액티비티 */}
                        <Component
                          stageData={stageData}
                          activityId={activityId}
                          goToNextActivity={goToNextActivity}
                          goToPrevActivity={goToPrevActivity}
                          goToActivity={goToActivity}
                        />

                        <CurrentStage stageIndex={stageIndex + 1} stageLength={stages.length} />
                      </Content>
                    </BackgroundContent>
                  );
                }}

              />
            </>
          )
        }}
      />
    </>
  );
}