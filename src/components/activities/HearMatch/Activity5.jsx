export default function Activity5({ stageData }) {
  return (
    <div>
      <h3>Activity 5</h3>
      <p>단어: {stageData.word ?? "단어 없음"}</p>
    </div>
  );
}
