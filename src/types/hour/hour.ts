import {  EmployeeResNAme } from "../employee";
import { ProjectNameRes } from "../projekt";
import { KindOfWorkItemEntityRes} from "../kindOfWork";

export interface CreateHour {
    projectId: string;
    employeeId: string;
    kindofworkId: string;
    quantity: number;
    date: string;
    timeAd?: string;
}

export interface CreateHourRecord extends Omit<CreateHour, 'id'> {
    id?:string;
}

export interface HourItemEntity {
    id?: string;
    quantity: number;
}

export interface HoursItemRes {
    id?: string
    projectId: string;
    employeeId: string;
    kindofworkId: string;
    quantity: number;
    date: string;
}

export interface ListHourRes {
    place: number;
    hour: HourItemEntity;
}

export interface ListHourResAll {
    place: number;
    hour: HoursItemRes;
}

export interface GetPaginatedListOfHoursResponse {
   items: ListHourResAll[];
   pagesCount: number;
   totalItems: number;
}
export interface ListAllToAddHoursRes{
    employeeList:EmployeeResNAme[],
    projectList: ProjectNameRes[],
    kindofworkList:KindOfWorkItemEntityRes[],
}

