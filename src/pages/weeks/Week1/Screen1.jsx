import useSize from "@/hooks/useSize";

import styled from "@emotion/styled";

const Screen1 = ({correct, images, sounds}) => {
  const { resizedWidth, resizedHeight } = useSize();

  return (
    <>
      <Cap src={images.cap} alt="캡모자" resizedWidth={resizedWidth} resizedHeight={resizedHeight} />
      <Zipper src={images.zipper} alt="지퍼" resizedWidth={resizedWidth} resizedHeight={resizedHeight} />
      <Pencil src={images.pencil} alt="연필" resizedWidth={resizedWidth} resizedHeight={resizedHeight} />

      {/* <img src={images.cap} alt="스피커" />
      <img src={images.cap} alt="스피커" />
      <img src={images.cap} alt="스피커" /> */}
    </>
  )
};

export default Screen1;

const Cap = styled.img(props => ({
  width: `${props.resizedWidth * 0.2}px`,
  position: "absolute",
  left: `${props.resizedWidth * 0.4}px`,
  top: `${props.resizedHeight * 0.45}px`,
}));
const Zipper = styled.img(props => ({
  width: `${props.resizedWidth * 0.2}px`,
  position: "absolute",
  left: `${props.resizedWidth * 0.65}px`,
  top: `${props.resizedHeight * 0.2}px`,
}));
const Pencil = styled.img(props => ({
  width: `${props.resizedWidth * 0.2}px`,
  position: "absolute",
  left: `${props.resizedWidth * 0.65}px`,
  top: `${props.resizedHeight * 0.6}px`,
}));