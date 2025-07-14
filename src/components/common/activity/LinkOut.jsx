
import useSize from "@/hooks/useSize";
import { Link } from "react-router-dom";

const LinkOut = ({ children, imageSrc, ...rest }) => {
  const { resizedWidth, resizedHeight } = useSize();

  const style = {
    width: (resizedWidth * 100) / 1194,
    height: (resizedHeight * 100) / 834,
    position: "absolute",
    top: "1%",
    left: "1%",
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