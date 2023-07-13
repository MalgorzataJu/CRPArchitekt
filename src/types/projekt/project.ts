export interface ProjectItemEntity {
  id: string;
  name: string;
  description: string;
  contact: string;
  quantityHours: number;
}
export type  GetTotalProjectHoursResponse = number;

export interface ProjectSimpleRes {
  id?: string;
  description: string;
  contact: string;
  name: string;
  startDate: string;
  endDate: string;
  quantityHours: number;
}
export interface ProjectNameRes {
  id: string;
  name: string;
}

export interface CreateProject {
  name: string;
  description: string;
  contact: string;
  startDate: string;
  endDate: string;
  quantityHours: number;
}

export interface ListProjectRes {
  place: number;
  project: ProjectSimpleRes;
  // hours: string[];
}

export type ListProjectSimpleResAll = ListProjectRes[];

