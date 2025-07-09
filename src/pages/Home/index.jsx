import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <ul>
          <li>
            <Link to="/samples/dragSample1">샘플기능테스트 (드래그앤드롭)</Link>
          </li>
          <li>
            <Link to="/samples/drawLineSample1">샘플기능테스트 (선긋기)</Link>
          </li>
        </ul>
      </nav>
      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <ul>
          <li>
            <Link to="/week1">1주차</Link>
          </li>
          <li>
            <Link to="/week2">2주차</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
