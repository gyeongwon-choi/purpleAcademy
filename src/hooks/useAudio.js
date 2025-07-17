import { useRef, useEffect, useState } from "react";
import { getAudioEnv } from "@/utils/audio/AudioEnv";
import { AudioPlayer } from "@/utils/audio/AudioPlayer";

// 오디오 재생
const useAudio = (fileList) => {
  const [ready, setReady] = useState(false);
  const envRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const env = getAudioEnv();
      await env.load(fileList);
      envRef.current = env;
      if (!playerRef.current) {
        playerRef.current = new AudioPlayer(env);
      }
      setReady(true);
    };

    init();

    const unlockAudio = async () => {
      if (envRef.current) {
        await envRef.current.resume();
      }
    };

    // 사용자 클릭 이벤트 시 resume()을 여러 번 호출
    const clickListener = () => {
      unlockAudio();
      document.removeEventListener("click", clickListener);
    };

    // 'click' 이벤트를 여러 번 처리
    document.addEventListener("click", clickListener);

    return () => {
      document.removeEventListener("click", clickListener);
    };
  }, [fileList]);

  return {
    ready, // 음원 로딩 상태
    playSingle: (file, loop = false) =>
      playerRef.current?.playSingle(file, loop), // 하나만 재생
    playMultiple: (file) => playerRef.current?.playMultiple(file), // 여러 음원 동시 재생
    playInSequence: (files) => playerRef.current?.playInSequence(files), // 여러 음원 순차적 재생
    stopAll: () => playerRef.current?.stopAll(), // 전부 정지
    setOnEachStarted: (cb) => playerRef.current?.setOnEachStarted(cb), // 개별 음원 종료 콜백
    setOnEachEnded: (cb) => playerRef.current?.setOnEachEnded(cb), // 개별 음원 종료 콜백
    setOnAllEnded: (cb) => playerRef.current?.setOnAllEnded(cb), // 여러 음원 종료 콜백
  };
};

export default useAudio;
