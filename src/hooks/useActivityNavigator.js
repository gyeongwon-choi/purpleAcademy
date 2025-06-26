import { useState } from "react";

// 스테이지마다 있는 액티비티
export default function useActivityNavigator(activityFlow, initial = activityFlow[0]) {
  const [activity, setActivity] = useState(initial);

  const goToNextActivity = () => {
    const currentIndex = activityFlow.indexOf(activity);
    const nextActivity = activityFlow[currentIndex + 1];
    if (nextActivity) setActivity(nextActivity);
  };

  const goToPrevActivity = () => {
    const currentIndex = activityFlow.indexOf(activity);
    const prevActivity = activityFlow[currentIndex - 1];
    if (prevActivity) setActivity(prevActivity);
  };

  const goToActivity = (target) => {
    if (activityFlow.includes(target)) {
      setActivity(target);
    }
  };

  return { activity, goToNextActivity, goToPrevActivity, goToActivity };
}
