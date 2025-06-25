import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/Home";
import DragSample1 from "@/pages/samples/DragSample1";
import DrawLineSample1 from "@/pages/samples/DrawLineSample1";
import W2SoundMapper from "@/pages/weeks/W2SoundMapper";

// 샘플 기능 확인용
const samplesRoutes = [
  { path: "dragSample1", element: <DragSample1 /> },
  { path: "drawLineSample1", element: <DrawLineSample1 /> },
];

// 주차별 페이지
const weeksRoutes = [
  { path: "soundMapper", element: <W2SoundMapper /> }
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
        path: `${route.path}`,
        element: route.element,
      })),
    ],
  },
]);

export default router;
