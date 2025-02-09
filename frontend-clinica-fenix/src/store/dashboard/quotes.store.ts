import { create } from 'zustand';

interface QuotesStore {
  totalQuotes: number;
  setTotalQuotes: (total: number) => void;
  incrementTotal: () => void;
  decrementTotal: () => void;
  resetTotal: () => void;
}

export const useQuotesStore = create<QuotesStore>((set) => ({
  totalQuotes: 0,
  setTotalQuotes: (total) => set({ totalQuotes: total }),
  incrementTotal: () => set((state) => ({ totalQuotes: state.totalQuotes + 1 })),
  decrementTotal: () => set((state) => ({ totalQuotes: Math.max(0, state.totalQuotes - 1) })),
  resetTotal: () => set({ totalQuotes: 0 })
}));