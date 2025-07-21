import styled from "@emotion/styled";
import { motion } from "framer-motion";

const StyledContent = styled.div`
  ${({ styleProps }) => styleProps && styleProps}
`;
const Light = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const InactivityNotice = ({ styleProps }) => {

  return (
    <StyledContent styleProps={styleProps}>
      <Light
        src={`${import.meta.env.VITE_DIRECTORY}/images/common/light.png`}
        alt=""
        animate={{
          opacity: [0.6, 1, 0.6], // 깜빡임 효과
          scale: [1, 1.05, 1],    // 살짝 커졌다 작아졌다
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </StyledContent>
  );
}

export default InactivityNotice;