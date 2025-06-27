import { motion, AnimatePresence } from "framer-motion";
import styled from "@emotion/styled";

const Layer = styled(motion.div)`
  position: absolute;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-color: #fff;
  z-index: 1000;
`;

const ScreenTransitionEffect = ({ animationKey }) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Layer
        key={animationKey}
        initial={{
          opacity: 1,
          backgroundColor: "#ffffff",
        }}
        animate={{
          opacity: 0,
          backgroundColor: "rgba(255, 255, 255, 0)",
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </AnimatePresence>
  );
};

export default ScreenTransitionEffect;
