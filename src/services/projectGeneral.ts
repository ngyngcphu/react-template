import { server, invoke } from './common';

export const projectGeneralService = {
  getAll: () => invoke<ProjectGeneralData[]>(server.get('/api/projects')),
  getById: (projectId: string) =>
    invoke<ProjectGeneralData>(server.get(`/api/projects/${projectId}`)),
  create: (payload: ProjectPayload) =>
    invoke<ProjectGeneralData>(server.post('/api/projects', payload)),
  update: (projectId: string, payload: ProjectPayload) =>
    invoke<ProjectGeneralData>(server.put(`/api/projects/${projectId}`, payload)),
  remove: (projectId: string) => invoke<null>(server.delete(`/api/projects/${projectId}`))
};
