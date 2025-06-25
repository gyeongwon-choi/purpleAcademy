import styled from "@emotion/styled";
import SOUNDMAPPER_DATA from "./data.json";
import StageManager from "@/components/common/StageManager";
import ActivityManager from "@/components/common/ActivityManager";
import ActivityComponents from "@/components/weeks/W2SoundMapper/ActivityComponents";
import CurrentStage from "@/components/common/CurrentStage";
import BackgroundContent from "@/components/common/BackgroundContent";
import Content from "@/components/common/Content";
import Question from "@/components/common/Question";
import LinkOut from "@/components/common/LinkOut";
import { useState } from "react";
import BtnLanguage from "@/components/common/BtnLanguage";

export default function W2_SoundMapper() {
  const [isLanguageEnglish, setIsLanguageEnglish] = useState(true);
  const stages = SOUNDMAPPER_DATA.stages;

  const handleClickBtnLanguage = () => {
    setIsLanguageEnglish(prev => !prev);
    console.log("클릭")
  }

  return (
    <>
      <LinkOut to="/">나가기</LinkOut>
      <StageManager
        stages={stages}
        renderStage={(stageData, stageIndex) => (
          <>
            <h2>이번 스테이지 단어: {stageData.word}</h2>

            <ActivityManager
              key={stageIndex}
              activityFlow={stageData.activities.map(a => a.id)}
              stageData={stageData}
              renderActivity={(activityId) => {
                const Component = ActivityComponents[activityId];
                if (!Component) return <p>지원되지 않는 액티비티입니다.</p>;

                const activity = stageData.activities.find(a => a.id === activityId);

                return (
                  <BackgroundContent>
                    <Question>
                      {isLanguageEnglish ? activity?.english : activity?.korean}
                      <BtnLanguage isLanguageEnglish={isLanguageEnglish} handleClickBtnLanguage={handleClickBtnLanguage} />
                    </Question>
                    <Content>
                      <Component stageData={stageData} />
                      <CurrentStage stageIndex={stageIndex + 1} stageLength={stages.length} />
                    </Content>
                  </BackgroundContent>
                );
              }}
            />
          </>
        )}
      />
    </>
  );
}