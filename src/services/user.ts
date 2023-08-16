import { server, invoke } from './common';

export const userService = {
  getInfo: () => invoke<string[]>(server.get('/api/users'))
};
