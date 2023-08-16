type UserInfo = {
  id: string;
  username: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  phone: string | null;
  birthdate: number | null;
  department: Department | null;
  links: string[];
};

type UserStore = {
  status: StoreStatus;
  data: UserInfo | null;
  getData: () => Promise<void>;
};
