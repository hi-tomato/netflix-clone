import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
type Theme = {
  theme: boolean;
  toggleTheme: (theme: boolean) => void;
};

const useTheme = create<Theme>()(
  persist(
    (set) => ({
      theme: false,
      toggleTheme: (theme) => set({ theme })
    }),
    { name: 'localTheme', storage: createJSONStorage(() => localStorage) }
  )
);

export default useTheme;
