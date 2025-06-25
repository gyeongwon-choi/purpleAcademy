import { useState } from "react";

// 스테이지마다 있는 액티비티
export default function useActivityNavigator(activityFlow, initial = activityFlow[0]) {

  // 현재 액티비티 상태
  const [activity, setActivity] = useState(initial);

  // 다음 액티비티로 이동
  const goToNextActivity = () => {
    const currentIndex = activityFlow.indexOf(activity);
    const nextActivity = activityFlow[currentIndex + 1];
    console.log(nextActivity)
    if (nextActivity) setActivity(nextActivity);
  };

  // 이전 액티비티로 이동
  const goToPrevActivity = () => {
    const currentIndex = activityFlow.indexOf(activity);
    const prevActivity = activityFlow[currentIndex - 1];
    console.log(prevActivity)
    if (prevActivity) setActivity(prevActivity);
  };

  // 특정 액티비티로 이동
  const goToActivity = (target) => {
    if (activityFlow.includes(target)) {
      setActivity(target);
    }
  };

  return { activity, goToNextActivity, goToPrevActivity, goToActivity };
}
