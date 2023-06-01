export type CreateEmployeeProfileParams = {
  name: string;
  lastname: string;
  hourly?: number;
};
export type RegisterEmployeeRes = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirm: string;
  hourly: number;
}

export type CreateEmployeeRes = {
  id: string;
  email:string;
}

export interface EmployeeRes {
  id?: string;
  name: string;
  email: string;
}

export interface EmployeeResAllInfo {
  id?: string;
  name: string;
  lastname: string;
  email: string;
  authStrategy: string;
  hourly?: number;
}

export interface EmployeeResNAme {
  id: string;
  name: string;
}
export type ProfileEntityRes = {
  id?: string;
  name: string;
  lastname: string;
  hourly?: number;
}

export interface EmployeeItemEntity extends EmployeeRes {
  email: string;
  password: string;
  authStrategy: string;
  profile: ProfileEntityRes;
}

export type ListEmployeeRespon = {
  id: string;
  email:string;
  name: string;
  lastname: string;
  hourly: number;
};


export type CreateEmployeeParams = {
  password: string;
  email: string;
};

export type UpdateEmployeeParams = {
  password: string;
  email: string;
};

export interface CreateEmpoyeeRecord extends Omit<EmployeeItemEntity, 'id'> {
  id?: string;
}
export interface RegisterUserRespon {
  id: string;
  email: string;
}

export interface ListEmployeeRes {
  place: number;
  employee: EmployeeItemEntity;
}

export interface ListEmployeeResAll {
  place: number;
  employee: ListEmployeeRespon;
}
