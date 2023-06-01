import { IsNotEmpty, Length, Matches } from "class-validator";
import { REGEX } from "../../utils/app.utils";

export class  RegisterEmployeeRegDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  email:string;

  @IsNotEmpty()
  @Length(4, 24)
  @Matches(REGEX.PASSWORD_RULE, {message: "HAsło powinno zaiwerać małe i duże literty"})
  password: string;

  @IsNotEmpty()
  @Length(4, 24)
  @Matches(REGEX.PASSWORD_RULE, {message: "HAsło powinno zaiwerać małe i duże literty"})
  confirm: string;

  @IsNotEmpty()
  hourly: number;

}