export default function Activity3({ stageData }) {
  return (
    <div>
      <h3>Activity 3</h3>
      <p>단어: {stageData.word ?? "단어 없음"}</p>
      <p>스테이지넘버: {stageData.stageId ?? "스테이지넘버 없음"}</p>
      <p>액티비티넘버: {stageData.activities[0].id ?? "액티비티넘버 없음"}</p>
    </div>
  );
}
