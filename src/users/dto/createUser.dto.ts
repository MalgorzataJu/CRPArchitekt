import { UserRole } from "../../types";
import {UsersEntity} from "../../entities/Users.entity";

export class CreateUserDto{
  id: string;
  email: string;
  pwd: string;
  isActive: boolean;
  role: UserRole;
  registerToken: string;
  currentTokenId: string | null;
  createdAt: Date;
}

export interface RequestWithEmployee {
  user: UsersEntity;
}
