export const runSequence = async (steps = []) => {
  for (const step of steps) {
    const { beforeAsyncFn, stateChangeFn } = step;
    if (typeof beforeAsyncFn === "function") {
      await beforeAsyncFn();
    }
    if (typeof stateChangeFn === "function") {
      stateChangeFn();
    }
  }
};

/* 
import { runSequence } from "@/utils/runSequence";

const handleClick = () => {
  runSequence([
    {
      beforeAsyncFn: () => playVoice("step1"),
      stateChangeFn: () => setStep(1)
    },
    {
      beforeAsyncFn: () => playVoice("step2"),
      stateChangeFn: () => setStep(2)
    },
    {
      beforeAsyncFn: () => playVoice("step3"),
      stateChangeFn: () => setStep(3)
    }
  ]);
};
*/