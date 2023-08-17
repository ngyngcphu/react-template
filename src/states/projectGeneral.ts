import { create } from 'zustand';
import { projectGeneralService } from '@services';

export const useProjectGeneralStore = create<ProjectGeneralStore>()((set, get) => ({
  projectGeneralStatus: 'UNINIT',
  projectGeneralData: [],
  projectSelectedById: {
    id: '',
    name: '',
    projectType: '',
    description: '',
    status: '',
    startDate: 0,
    endDate: 0,
    avatar: []
  },
  getAllProjects: async () => {
    set(() => ({ projectGeneralStatus: 'PENDING' }));
    try {
      const projectGeneralData = await projectGeneralService.getAll();
      set(() => ({ projectGeneralData: projectGeneralData, projectGeneralStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ projectGeneralStatus: 'REJECT' }));
    }
  },
  getProjectById: async (projectId) => {
    set(() => ({ projectGeneralStatus: 'PENDING' }));
    try {
      const projectSelectedById = await projectGeneralService.getById(projectId);
      set(() => ({ projectSelectedById: projectSelectedById, projectGeneralStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ projectGeneralStatus: 'REJECT' }));
    }
  },
  createProject: async (payload) => {
    set(() => ({ projectGeneralStatus: 'PENDING' }));
    try {
      await projectGeneralService.create(payload);
      await get().getAllProjects();
      set(() => ({ projectGeneralStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ projectGeneralStatus: 'REJECT' }));
    }
  },
  updateProject: async (projectId, payload) => {
    set(() => ({ projectGeneralStatus: 'PENDING' }));
    try {
      await projectGeneralService.update(projectId, payload);
      await get().getAllProjects();
      set(() => ({ projectGeneralStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ projectGeneralStatus: 'REJECT' }));
    }
  },
  removeProject: async (projectId) => {
    set(() => ({ projectGeneralStatus: 'PENDING' }));
    try {
      await projectGeneralService.remove(projectId);
      await get().getAllProjects();
      set(() => ({ projectGeneralStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ projectGeneralStatus: 'REJECT' }));
    }
  }
}));
