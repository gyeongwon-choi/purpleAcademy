import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/Home";
import DragSample1 from "@/pages/samples/DragSample1";
import DrawLineSample1 from "@/pages/samples/DrawLineSample1";
import Week1 from "@/pages/weeks/Week1";

// 샘플 기능 확인용
const samplesRoutes = [
  { path: "dragSample1", element: <DragSample1 /> },
  { path: "drawLineSample1", element: <DrawLineSample1 /> },
];

// 주차별 페이지
const weeksRoutes = [
  { path: "week1", element: <Week1 /> },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      ...samplesRoutes.map((route) => ({
        path: `samples/${route.path}`,
        element: route.element,
      })),
      ...weeksRoutes.map((route) => ({
        path: `sadlierPhonicsB/${route.path}`,
        element: route.element,
      })),
    ],
  },
]);

export default router;
