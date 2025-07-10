import useSize from "@/hooks/useSize";
//import useTimeout from "@/hooks/useTimeout";

import styled from "@emotion/styled";

import BackgroundContent from "@/components/common/activity/BackgroundContent";

import Content from "@/components/common/activity/Content";

export default function ThumbNail({ thumbnailObj, endThumbnail, handleBtnStart }) {
  const { resizedWidth, resizedHeight } = useSize();
  const {background, char, board, title, week} = thumbnailObj;
  //useTimeout(endThumbnail, 3000);
  
  return (
    <BackgroundContent
      backgroundImage={background}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Content>
        <Char src={char} resizedWidth={resizedWidth} resizedHeight={resizedHeight} />
        <Board src={board} resizedWidth={resizedWidth} resizedHeight={resizedHeight} />
        <Title resizedWidth={resizedWidth} resizedHeight={resizedHeight}>{title}</Title>
        <Week resizedWidth={resizedWidth} resizedHeight={resizedHeight}>{week}</Week>
        <Button type="button" resizedWidth={resizedWidth} resizedHeight={resizedHeight} onClick={handleBtnStart}>START</Button>
      </Content>
    </BackgroundContent>
  );
}

const Char = styled.img(props => ({
  width: `${props.resizedWidth * 0.25}px`,
  position: "absolute",
  left: `${props.resizedWidth * 0.73}px`,
  top: `${props.resizedHeight * 0.35}px`,
}));
const Board = styled.img(props => ({
  width: `${props.resizedWidth * 0.67}px`,
  position: "absolute",
  left: `${props.resizedWidth * 0.08}px`,
  top: `${props.resizedHeight * 0.19}px`,
}));
const Title = styled.h2(props => ({
  position: "absolute",
  left: `${props.resizedWidth * 0.3}px`,
  top: `${props.resizedHeight * 0.39}px`,
  fontFamily: "OneMobilePopOtf",
  fontSize: `${props.resizedWidth * 0.07}px`,
  whiteSpace: "nowrap",
}));
const Week = styled.p(props => ({
  position: "absolute",
  left: `${props.resizedWidth * 0.4}px`,
  top: `${props.resizedHeight * 0.51}px`,
  fontFamily: "OneMobilePopOtf",
  fontSize: `${props.resizedWidth * 0.07}px`,
  whiteSpace: "nowrap",
}));
const Button = styled.p(props => ({
  position: "absolute",
  left: `${props.resizedWidth * 0.4}px`,
  top: `${props.resizedHeight * 0.9}px`,
  fontFamily: "OneMobilePopOtf",
  fontSize: `${props.resizedWidth * 0.02}px`,
  whiteSpace: "nowrap",
  backgroundColor: "#ddd",
  padding: "20px",
  cursor: "pointer"
}));