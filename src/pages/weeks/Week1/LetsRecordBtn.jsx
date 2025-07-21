import { useState } from "react";
import useSize from "@/hooks/useSize";
import useInActivityWatcher from "@/hooks/useInActivityWatcher";

import styled from "@emotion/styled";
import InactivityNotice from "@/components/common/activity/InactivityNotice";

const ACTIVITY_IMG_PATH = `${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity`;

const LetsRecordBtn = ({ screenControls }) => {
  const { resizedWidth, resizedHeight } = useSize();
  const { goToNextScreen } = screenControls;
  const [inActivityState, setInActivityState] = useState(false);

  // 30초간 액션 없을 시 (data-action="click" 속성이 있는 요소 클릭 시 리셋)
  useInActivityWatcher({
    timeout: 30000,
    onTimeout: () => {
      setInActivityState(true);
    },
  });

  return (
    <>
      <Wrapper
        resizedWidth={resizedWidth} resizedHeight={resizedHeight}
        onClick={() => { goToNextScreen() }}
      >
        <RecordBtn
          src={`${ACTIVITY_IMG_PATH}/letsRecordBtn.png`}
          alt=""
        />
        {inActivityState && (
          <InactivityNotice
            styleProps={`
              position: absolute;
              width: 50%;
              height: 50%;
              right: 0%;
              bottom: 0%;
            `}
          />
        )}
      </Wrapper>
    </>
  );
};

export default LetsRecordBtn;

const Wrapper = styled.div((props) => {
  const { resizedWidth, resizedHeight } = props;

  return {
    width: `${resizedWidth * 0.2}px`,
    position: "absolute",
    left: `50%`,
    top: `${resizedHeight * 0.88}px`,
    transform: "translate(-50%,0)",
    zIndex: "2",
    cursor: "pointer"
  };
});
const RecordBtn = styled.img(() => {
  return {
    width: `100%`,
    height: `100%`,
    objectFit: "contain",
  };
});
