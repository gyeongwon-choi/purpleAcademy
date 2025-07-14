import useSize from "@/hooks/useSize";
//import useTimeout from "@/hooks/useTimeout";

import styled from "@emotion/styled";

import BackgroundContent from "@/components/common/activity/BackgroundContent";

import Content from "@/components/common/activity/Content";

export default function ThumbNail({ thumbnailObj, handleBtnStart }) {
  const { resizedWidth, resizedHeight } = useSize();
  const {backgroundSrc, charSrc, boardSrc, title, week, startBtnSrc, weekTextColor} = thumbnailObj;
  
  return (
    <BackgroundContent
      backgroundImage={backgroundSrc}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Content>
        <Char src={charSrc} resizedWidth={resizedWidth} resizedHeight={resizedHeight} />
        <Board boardSrc={boardSrc} resizedWidth={resizedWidth} resizedHeight={resizedHeight}>
          <Title resizedWidth={resizedWidth} resizedHeight={resizedHeight}>{title}</Title>
          <Week resizedWidth={resizedWidth} resizedHeight={resizedHeight} weekTextColor={weekTextColor}>{week}</Week>
        </Board>
        <Button type="button" resizedWidth={resizedWidth} resizedHeight={resizedHeight} startBtnSrc={startBtnSrc} onClick={handleBtnStart}>START</Button>
      </Content>
    </BackgroundContent>
  );
}

const Char = styled.img(props => ({
  width: `${props.resizedWidth * 0.15}px`,
  position: "absolute",
  left: `${props.resizedWidth * 0.001}px`,
  top: `${props.resizedHeight * 0.55}px`,
}));
const Board = styled.div(props => ({
  width: `${props.resizedWidth * 0.67}px`,
  height: `${props.resizedHeight * 0.47}px`,
  position: "absolute",
  left: `${props.resizedWidth * 0.18}px`,
  top: `${props.resizedHeight * 0.19}px`,
  backgroundImage: `url(${props.boardSrc})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "center center",
}));
const Title = styled.h2(props => ({
  position: "absolute",
  left: `50%`,
  top: `38%`,
  transform: "translate(-50%,0)",
  fontFamily: "OneMobilePop-Regular",
  fontSize: `${props.resizedWidth * 0.07}px`,
  whiteSpace: "nowrap",
}));
const Week = styled.p(props => ({
  position: "absolute",
  left: `50%`,
  top: `62%`,
  transform: "translate(-50%,0)",
  fontFamily: "OneMobilePop-Regular",
  fontSize: `${props.resizedWidth * 0.07}px`,
  whiteSpace: "nowrap",
  color: `${props.weekTextColor}`
}));
const Button = styled.p(props => ({
  position: "absolute",
  left: `${props.resizedWidth * 0.4}px`,
  top: `${props.resizedHeight * 0.8}px`,
  width: `${props.resizedWidth * 0.22}px`,
  height: `${props.resizedHeight * 0.11}px`,
  fontFamily: "OneMobilePop-Regular",
  fontSize: `${0}px`,
  backgroundImage: `url(${props.startBtnSrc})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "center center",
  whiteSpace: "nowrap",
  cursor: "pointer"
}));