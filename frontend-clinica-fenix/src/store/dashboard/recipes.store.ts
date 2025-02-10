import { create } from 'zustand';

interface RecipesStore {
    totalRecipes: number;
    setTotalRecipes: (total: number) => void;
    incrementTotal: () => void;
    decrementTotal: () => void;
    resetTotal: () => void;
}

export const useRecipesStore = create<RecipesStore>((set) => ({
    totalRecipes: 0,
    setTotalRecipes: (total) => set({ totalRecipes: total }),
    incrementTotal: () => set((state) => ({ totalRecipes: state.totalRecipes + 1 })),
    decrementTotal: () => set((state) => ({ totalRecipes: Math.max(0, state.totalRecipes - 1) })),
    resetTotal: () => set({ totalRecipes: 0 })
}));