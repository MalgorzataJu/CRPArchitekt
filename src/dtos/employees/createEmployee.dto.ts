export class CreateEmployeeDto {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  authStrategy: string;
}
