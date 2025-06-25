import { create } from 'zustand';

const useAspectRatioStore = create((set) => ({
  aspectRatio: window.innerWidth / window.innerHeight,
  setAspectRatio: (ratio) => set({ aspectRatio: ratio }),
}));

export default useAspectRatioStore;
