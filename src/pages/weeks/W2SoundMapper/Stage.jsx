/* import ActivityComponents from "@/components/weeks/W2SoundMapper/ActivityComponents";

export default function Stage({ data }) {

  const { activity, goToNextActivity, goToPrevActivity } = useActivityNavigator(Object.keys(ActivityComponents));

  const ActivityComponent = ActivityComponents[activity];

  return (
    <div>
      <h1>현재 단계: {activity}</h1>

      <div>
        {ActivityComponent ? <ActivityComponent data={data} /> : <p>지원되지 않는 액티비티입니다.</p>}
      </div>

      <button onClick={goToPrevActivity}>이전 액티비티로</button>
      <button onClick={goToNextActivity}>다음 액티비티로</button>
    </div>
  );
} */