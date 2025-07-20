export class AudioPlayer {
  constructor(env) {
    this.env = env;
    this.singleSource = null;
    this.multiSources = [];
    this.queue = [];
    this.isPlayingQueue = false;

    // 콜백 초기화
    this.onEachEnded = null;
    this.onEachEnded = null;
    this.onAllEnded = null;
  }

  // 콜백 등록 메서드
  setOnEachStarted(callback) {
    this.onEachStarted = callback;
  }

  setOnEachEnded(callback) {
    this.onEachEnded = callback;
  }

  setOnAllEnded(callback) {
    this.onAllEnded = callback;
  }

  // 하나만 재생
  playSingle(file, loop = false) {
    this.stopAll();

    if (this.env.os === "ios") {
      const buffer = this.env.getBuffer(file);
      if (!buffer) return;

      const source = this.env.ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = loop;
      source.connect(this.env.ctx.destination);
      source.onended = () => {
        this.onEachEnded?.();
      };
      this.onEachStarted?.();
      source.start(0);
      this.singleSource = source;
    } else {
      const audio = this.env.getAudioTag(file);
      if (!audio) return;

      audio.loop = loop;
      audio.currentTime = 0;
      audio.onended = () => {
        this.onEachEnded?.();
      };
      this.onEachStarted?.();
      audio.play();
      this.singleSource = audio;
    }
  }

  // 동시에 여러개 재생
  playMultiple(file) {
    if (this.env.os === "ios") {
      const buffer = this.env.getBuffer(file);
      if (!buffer) return;

      const source = this.env.ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(this.env.ctx.destination);
      source.onended = () => {
        this.onEachEnded?.();
      };
      this.onEachStarted?.();
      source.start(0);
      this.multiSources.push(source);
    } else {
      const original = this.env.getAudioTag(file);
      if (!original) return;

      const audio = new Audio(original.src);
      audio.currentTime = 0;
      audio.onended = () => {
        this.onEachEnded?.();
      };
      this.onEachStarted?.();
      audio.play();
      this.multiSources.push(audio);
    }
  }

  // 전부 정지
  stopAll() {
    if (this.singleSource) {
      try {
        this.singleSource.stop?.();
        this.singleSource.pause?.();
      } catch {}
      this.singleSource = null;
    }

    this.multiSources.forEach((s) => {
      try {
        s.stop?.();
        s.pause?.();
      } catch {}
    });
    this.multiSources = [];

    this.queue = [];
    this.isPlayingQueue = false;
  }

  // 여러 음원 순차적으로 재생
  playInSequence(fileList, delay = 500) {
    if (!fileList || !fileList.length) return;

    this.stopAll();
    this.queue = [...fileList];
    this.isPlayingQueue = true;

    // 비동기적으로 순차 재생
    this._playNextInQueue();
  }

  async _playNextInQueue() {
    if (!this.queue.length) {
      this.isPlayingQueue = false;
      this.onAllEnded?.(); // 모든 큐 끝났을 때 콜백
      return;
    }

    const nextFile = this.queue.shift();
    try {
      await this._playFile(nextFile); // 순차 재생
      this._playNextInQueue(); // 다음 파일 재생
    } catch (error) {
      console.error("파일 재생 실패:", error);
      this._playNextInQueue(); // 오류가 발생해도 다음 파일 재생
    }
  }

  async _playFile(file) {
    return new Promise((resolve, reject) => {
      if (this.env.os === "ios") {
        const buffer = this.env.getBuffer(file);
        if (!buffer) return reject(new Error("파일 로드 실패"));

        const source = this.env.ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.env.ctx.destination);
        source.onended = () => {
          this.onEachEnded?.(); // 현재 파일 끝날 때 콜백
          resolve(); // 재생이 끝나면 다음 파일을 재생
        };
        this.onEachStarted?.(); // 파일이 시작될 때 콜백
        source.start(0);
        this.singleSource = source;
      } else {
        const original = this.env.getAudioTag(file);
        if (!original) return reject(new Error("파일 로드 실패"));

        const audio = new Audio(original.src);
        audio.currentTime = 0;
        audio.onended = () => {
          this.onEachEnded?.(); // 현재 파일 끝날 때 콜백
          resolve(); // 재생이 끝나면 다음 파일을 재생
        };
        this.onEachStarted?.(); // 파일이 시작될 때 콜백
        audio.play().catch(reject); // play 오류 처리
        this.singleSource = audio;
      }
    });
  }
}
