type UserStore = {
  userStatus: StoreStatus;
  userData: string[];
  getUserData: () => Promise<void>;
};
