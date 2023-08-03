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
  stocktaking: number;
  conception: number;
  setOf: number;
  excess: number;
  executive : number;
  control : number;
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
  stocktaking: number;
  conception: number;
  setOf: number;
  excess: number;
  executive : number;
  control : number;
}
export interface ListKindOfHourForProject {
  kindofwork: string;
  sumKindOfWork: number;
}
export interface ListProjectRes {
  place: number;
  project: ProjectSimpleRes;
  hours: ListKindOfHourForProject[];
  sumOfDone: number;
}

export type ListProjectSimpleResAll = ListProjectRes[];

