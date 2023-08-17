import { create } from 'zustand';

export const useNavigationBarStore = create<NavigationBarStore>()((set) => ({
  typeMobileNavbar: '',
  setTypeMobileNavbar: (type) => {
    set({ typeMobileNavbar: type });
  }
}));
