export default function Activity2({ stageData }) {
  return (
    <div>
      <h3>Activity 2</h3>
      <p>단어: {stageData.word ?? "단어 없음"}</p>
    </div>
  );
}
