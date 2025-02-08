import { create } from 'zustand';

interface PatientsStore {
  totalPatients: number;
  setTotalPatients: (total: number) => void;
  incrementTotal: () => void;
  decrementTotal: () => void;
  resetTotal: () => void;
}

export const usePatientsStore = create<PatientsStore>((set) => ({
  totalPatients: 0,
  setTotalPatients: (total) => set({ totalPatients: total }),
  incrementTotal: () => set((state) => ({ totalPatients: state.totalPatients + 1 })),
  decrementTotal: () => set((state) => ({ totalPatients: Math.max(0, state.totalPatients - 1) })),
  resetTotal: () => set({ totalPatients: 0 })
}));