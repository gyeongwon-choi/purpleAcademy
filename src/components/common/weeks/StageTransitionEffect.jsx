import { motion, AnimatePresence } from "framer-motion";
import styled from "@emotion/styled";

const Layer = styled(motion.div)`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-color: white;
  backdrop-filter: blur(12px);
  z-index: 1000;
`;

const StageTransitionEffect = ({ animationKey }) => (
  <AnimatePresence mode="wait" initial={false}>
    <Layer
      key={animationKey}
      initial={{
        opacity: 1,
        filter: "blur(12px)",
      }}
      animate={{
        opacity: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 2.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  </AnimatePresence>
);

export default StageTransitionEffect;
