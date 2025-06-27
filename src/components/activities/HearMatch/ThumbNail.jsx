import useTimeout from "@/hooks/useTimeout";

export default function ThumbNail({ endIntro }) {
  useTimeout(endIntro, 3000);

  return (
    <div>
      <h3>ThumbNail</h3>
      <button type="button" onClick={endIntro}>다음으로</button>
    </div>
  );
}
