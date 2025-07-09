import axios from "axios";
import { getOS } from "./platform";

class AudioEnv {
  constructor() {
    if (AudioEnv.instance) return AudioEnv.instance;

    this.os = getOS();
    this.ctx = this.os === "ios" ? new (window.AudioContext || window.webkitAudioContext)() : null;
    this.buffers = {};
    this.audioTags = {};

    AudioEnv.instance = this;
  }

  async load(fileList) {
    const newFiles = fileList.filter((f) => !(this.buffers[f] || this.audioTags[f]));

    if (this.os === "ios") {
      await Promise.all(
        newFiles.map(async (file) => {
          const res = await axios.get(file, {
            responseType: "arraybuffer",
          });
          const buffer = await this.ctx.decodeAudioData(res.data);
          this.buffers[file] = buffer;
        })
      );
    } else {
      newFiles.forEach((file) => {
        const audio = new Audio(file);
        audio.preload = "auto";
        this.audioTags[file] = audio;
      });
    }
  }

  getBuffer(file) {
    return this.buffers[file] || null;
  }

  getAudioTag(file) {
    return this.audioTags[file] || null;
  }

  async resume() {
    if (this.ctx?.state === "suspended") {
      await this.ctx.resume();
    }
  }
}

export const getAudioEnv = () => new AudioEnv(); // 싱글톤 반환
