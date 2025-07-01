import { create } from 'zustand';

const useUiInteractionEnableStore = create((set) => ({
  isInteractionEnabled: true,
  setInteractionEnabled: (enabled) => set({ isInteractionEnabled: enabled }),
}));

export default useUiInteractionEnableStore;
