export default function Activity1({ stageData }) {
  return (
    <div>
      <h3>Activity 1</h3>
      <p>단어: {stageData.word ?? "단어 없음"}</p>
    </div>
  );
}
