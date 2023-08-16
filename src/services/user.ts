import { server, invoke } from './common';

export const userService = {
  getInfo: () => invoke<UserInfo>(server.get('/api/users'))
};
