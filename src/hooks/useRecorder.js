import { useRef, useState } from "react";

export default function useRecorder() {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

  const startRecording = async () => {
    try {
      // 권한 상태를 체크
      const permissionStatus = await navigator.permissions.query({
        name: "microphone",
      });

      if (permissionStatus.state === "granted") {
        // 이미 권한이 허용된 경우, getUserMedia를 바로 호출
        startMediaRecording();
      } else if (permissionStatus.state === "prompt") {
        // 권한 요청이 아직 이루어지지 않은 경우, 권한을 요청
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        startMediaRecording(stream);
      } else {
        // 권한이 거부된 경우, 사용자에게 권한을 요청하거나 메시지 출력
        console.error("마이크 권한이 거부되었습니다.");
      }
    } catch (err) {
      console.error("권한 상태 확인 실패:", err);
    }
  };

  const startMediaRecording = (stream) => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/wav" });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return {
    recording,
    audioURL,
    startRecording,
    stopRecording,
  };
}
