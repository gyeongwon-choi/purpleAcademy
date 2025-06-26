import styled from "@emotion/styled";

const StyledBg = styled.div(props => ({
  width: "100vw",
  height: "100%",
  position: "absolute",
  left: 0,
  top: 0,
  display: "flex",
  justifyContent: "center",
  overflow: "hidden",
  backgroundImage: `url(${props.backgroundImage})`,
  backgroundRepeat: props.backgroundRepeat || "no-repeat",
  backgroundPosition: props.backgroundPosition || "center",
  backgroundSize: props.backgroundSize || "auto 110%",
}));

const BackgroundContent = ({
  backgroundImage = "/images/weeks/w2soundMapper/test.png",
  backgroundSize,
  backgroundPosition,
  backgroundRepeat,
  children,
}) => {
  return (
    <StyledBg
      backgroundImage={backgroundImage}
      backgroundSize={backgroundSize}
      backgroundPosition={backgroundPosition}
      backgroundRepeat={backgroundRepeat}
    >
      {children}
    </StyledBg>
  );
};

export default BackgroundContent;
