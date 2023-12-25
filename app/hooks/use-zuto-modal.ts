import { create } from "zustand";

interface IUseZutoModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useZutoModal = create<IUseZutoModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useZutoModal;
