type AvatarData = {
  name: string;
  imgUrl: string;
};

type ProjectGeneralData = {
  id: string;
  name: string;
  projectType: string;
  description: string;
  status: string;
  startDate: number;
  endDate: number;
  avatar: AvatarData[];
};

type ProjectPayload = Omit<ProjectGeneralData, 'id'>;

type ProjectGeneralStore = {
  projectGeneralStatus: StoreStatus;
  projectGeneralData: ProjectGeneralData[];
  projectSelectedById: ProjectGeneralData;
  getAllProjects: () => Promise<void>;
  getProjectById: (projectId: string) => Promise<void>;
  createProject: (payload: ProjectPayload) => Promise<void>;
  updateProject: (projectId: string, payload: ProjectPayload) => Promise<void>;
  removeProject: (projectId: string) => Promise<void>;
};
