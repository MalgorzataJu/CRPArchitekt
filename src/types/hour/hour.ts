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

export interface CreateHoursNumber {
    hours: number,
    minutes: number,
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

export interface  ListHourCountRes {
    id: string
    date: string;
    quantity: number;
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
export interface SimpleRest{
    name:string,
    total_quantity: string
}
// export interface SimpleRestHoursKOW{
//     kinds_of_work:string,
//     total_quantity: string
// }
export interface StatisticHoursForEmployee {
    hoursCountPerDay: ListHourCountRes[],
    hoursForProject : SimpleRest[],
    hoursForKindeOfWork: SimpleRest[],
    totalMonthlyHours: number,
    totalMonthlyHoursForEmployee?:SimpleRest[],
}
