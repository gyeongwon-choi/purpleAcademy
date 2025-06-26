
import useSize from "@/hooks/useSize";
import { Link } from "react-router-dom";

const LinkOut = ({ children, ...rest }) => {
  const { resizedWidth, resizedHeight } = useSize();

  const style = {
    width: (resizedWidth * 36) / 1194,
    height: (resizedHeight * 43) / 834,
    position: "absolute",
    top: "4%",
    left: "1%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 300,
    fontSize: 0,
    backgroundImage: "url(/images/common/back.png)",
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