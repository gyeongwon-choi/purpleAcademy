export default function Activity4({ stageData }) {
  return (
    <div>
      <h3>Activity 4</h3>
      <p>단어: {stageData.word ?? "단어 없음"}</p>
    </div>
  );
}
