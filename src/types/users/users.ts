import { UsersEntity } from "../../entities/Users.entity";

export interface getUserEmailResponse {
  email: string;
}
interface RequestWithUser extends Request {
  user: UsersEntity;
}
