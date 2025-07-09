import { create } from "zustand";
import axios from "axios";
import { getMobileOS } from "../utils/platform";

export const useAudioStore = create((set, get) => {
  const os = getMobileOS();

  // iOS: Web Audio API
  if (os === "ios") {
    return {
      audioCtx: null,
      audioBuffers: {},
      sourceRef: null,
      isReady: false,

      initAudio: async (audioList) => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const buffers = {};

        const fetchAndDecode = async (filename) => {
          try {
            const res = await axios.get(
              import.meta.env.VITE_DIRECTORY + filename,
              { responseType: "arraybuffer" }
            );
            const buffer = await ctx.decodeAudioData(res.data);
            buffers[filename] = buffer;
          } catch (e) {
            console.warn(`Failed to decode ${filename}`, e);
          }
        };

        await Promise.all(audioList.map(fetchAndDecode));

        set({
          audioCtx: ctx,
          audioBuffers: buffers,
          isReady: true,
        });
      },

      resumeAudioContext: async () => {
        const ctx = get().audioCtx;
        if (ctx?.state === "suspended") {
          await ctx.resume();
        }
      },

      play: (filename, { loop = false } = {}) => {
        const { audioCtx, audioBuffers } = get();
        const buffer = audioBuffers[filename];
        if (!audioCtx || !buffer) return;

        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.loop = loop;
        source.connect(audioCtx.destination);
        source.start(0);
        set({ sourceRef: source });
      },

      stop: () => {
        const source = get().sourceRef;
        if (source) {
          source.stop();
          set({ sourceRef: null });
        }
      },
    };
  }

  // Android (또는 기타): <audio> 방식
  return {
    htmlAudioElements: {},
    isReady: false,

    initAudio: async (audioList) => {
      const elements = {};
      audioList.forEach((file) => {
        const audio = new Audio(import.meta.env.VITE_DIRECTORY + file);
        audio.preload = "auto";
        elements[file] = audio;
      });

      set({ htmlAudioElements: elements, isReady: true });
    },

    resumeAudioContext: async () => {
      // <audio>에서는 필요 없음
    },

    play: (filename, { loop = false } = {}) => {
      const audio = get().htmlAudioElements[filename];
      if (!audio) return;
      audio.loop = loop;
      audio.currentTime = 0;
      audio.play().catch((e) => console.warn(`Failed to play ${filename}`, e));
    },

    stop: () => {
      Object.values(get().htmlAudioElements).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    },
  };
});
