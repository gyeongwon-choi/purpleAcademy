
import useSize from "@/hooks/useSize";
import { Link } from "react-router-dom";

const LinkOut = ({ children, imageSrc, ...rest }) => {
  const { resizedWidth, resizedHeight } = useSize();

  const style = {
    width: (resizedWidth * 60) / 1194,
    height: (resizedHeight * 60) / 834,
    position: "absolute",
    top: "2.5%",
    left: "0%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 300,
    fontSize: 0,
    backgroundImage: `url(${imageSrc})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center center",
  };

  return (
    <Link style={style} {...rest} >
      {children}
    </Link>
  );
}

export default LinkOut;