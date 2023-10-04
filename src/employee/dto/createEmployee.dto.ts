import {IsNotEmpty} from "class-validator";

export class CreateEmployeeDto {
  id: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  hourly?:number;

  createdAt: Date;
}
