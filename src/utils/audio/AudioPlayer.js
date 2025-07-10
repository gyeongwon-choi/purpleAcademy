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
      } catch { }
      this.singleSource = null;
    }

    this.multiSources.forEach((s) => {
      try {
        s.stop?.();
        s.pause?.();
      } catch { }
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
    this._playNextInQueue(delay);
  }

  _playNextInQueue(delay) {
    if (!this.queue.length) {
      this.isPlayingQueue = false;
      this.onAllEnded?.(); // 모든 큐 끝났을 때 콜백
      return;
    }

    const nextFile = this.queue.shift();

    const playNext = () => {
      //this.onEachEnded?.(); // 음원 하나 끝났을 때 콜백

      if (delay > 0) {
        setTimeout(() => this._playNextInQueue(delay), delay);
      } else {
        this._playNextInQueue(delay);
      }
    };

    if (this.env.os === "ios") {
      const buffer = this.env.getBuffer(nextFile);
      if (!buffer) {
        playNext();
        return;
      }

      const source = this.env.ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(this.env.ctx.destination);
      source.onended = playNext;
      this.onEachStarted?.();
      source.start(0);
      this.singleSource = source;
    } else {
      const original = this.env.getAudioTag(nextFile);
      if (!original) {
        playNext();
        return;
      }

      const audio = new Audio(original.src);
      audio.currentTime = 0;
      audio.onended = playNext;
      this.onEachStarted?.();
      audio.play();
      this.singleSource = audio;
    }
  }
}
