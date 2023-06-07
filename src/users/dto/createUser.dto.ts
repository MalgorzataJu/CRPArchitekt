import { UserRole } from "../../types";

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

