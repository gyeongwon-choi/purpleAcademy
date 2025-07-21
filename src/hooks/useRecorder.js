import { useRef, useState } from "react";
import useUiInteractionEnableStore from '@/store/useUiInteractionEnableStore';

export default function useRecorder() {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timeoutIdRef = useRef(null); // setTimeout 저장용
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const { setInteractionEnabled } = useUiInteractionEnableStore();

  const startRecording = async (duration) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      timeoutIdRef.current = null; // 이전 타이머 초기화
      setInteractionEnabled(false);

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/wav" });
        setAudioBlob(blob);
        setInteractionEnabled(true);
      };

      mediaRecorder.start();
      setIsRecording(true);

      if (typeof duration === 'number' && duration > 0) {
        timeoutIdRef.current = setTimeout(() => {
          stopRecording();
        }, duration);
      }

    } catch (err) {
      console.error("녹음 시작 실패:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setInteractionEnabled(true);

      // 타이머가 있으면 정리
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    }
  };

  const emptyBlob = () => {
    setAudioBlob(null);
  }

  return {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
    emptyBlob
  };
}
