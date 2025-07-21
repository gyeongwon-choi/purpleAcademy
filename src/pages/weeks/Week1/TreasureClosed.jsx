import useSize from "@/hooks/useSize";

import styled from "@emotion/styled";

const ACTIVITY_IMG_PATH = `${import.meta.env.VITE_DIRECTORY}/images/week/week1/activity`;

const TreasureClosed = () => {
  const { resizedWidth, resizedHeight } = useSize();

  return (
    <>
      <Wrapper
        resizedWidth={resizedWidth} resizedHeight={resizedHeight}
        src={`${ACTIVITY_IMG_PATH}/treasure_close.png`}
        alt=""
        onClick={() => { goToNextScreen() }}
      />
    </>
  );
};

export default TreasureClosed;

const Wrapper = styled.img((props) => {
  const { resizedWidth, resizedHeight } = props;

  return {
    width: `${resizedWidth * 0.1}px`,
    position: "absolute",
    left: `${resizedWidth * 0.01}px`,
    top: `${resizedHeight * 0.65}px`,
  };
});
