import { create } from 'zustand';
import { userService } from '@services';

export const useUserStore = create<UserStore>()((set) => ({
  userStatus: 'UNINIT',
  userData: [],
  getUserData: async () => {
    set(() => ({ userStatus: 'PENDING' }));
    try {
      const userData = await userService.getInfo();
      set(() => ({ userData: userData, userStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ userStatus: 'REJECT' }));
    }
  }
}));
