import useActivityNavigator from "@/hooks/useActivityNavigator";

export default function ActivityManager({ stageData, renderActivity }) {
  const activities = stageData.activities || [];

  const { activity, goToNextActivity, goToPrevActivity, goToActivity } = useActivityNavigator(activities.map(a => a.id));

  const activityIndex = activities.findIndex(a => a.id === activity);
  const activityData = activities[activityIndex];
  const activityId = activityData?.id;

  return (
    <div>
      {renderActivity(activityId, goToNextActivity, goToPrevActivity, goToActivity)}

      <span style={{position: "fixed", bottom: "20px", left: "0%", zIndex: "1000"}}>액티비티 : {activityId}</span>
      <button onClick={goToPrevActivity} disabled={activityIndex === 0} style={{position: "fixed", bottom: "20px", left: "5%", zIndex: "1000"}}>
        이전 액티비티
      </button>
      <button onClick={goToNextActivity} disabled={activityIndex === activities.length - 1} style={{position: "fixed", bottom: "20px", left: "10%", zIndex: "1000"}}>
        다음 액티비티
      </button>
    </div>
  );
}
