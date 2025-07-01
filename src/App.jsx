import { Outlet } from "react-router-dom";
import useAspectRatioListener from "@/hooks/useAspectRatioListener";
import useUiInteractionEnableStore from "@/store/useUiInteractionEnableStore";

import styled from "@emotion/styled";

export default function App() {
  useAspectRatioListener();
  const isInteractionEnabled = useUiInteractionEnableStore((state) => state.isInteractionEnabled);

  return (
    <Wrapper isInteractionEnabled={isInteractionEnabled}>
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: ${(props) => (props.isInteractionEnabled ? "auto" : "none")};
`;