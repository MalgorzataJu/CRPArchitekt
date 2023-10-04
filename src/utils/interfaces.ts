import { Request } from 'express';
import {UsersEntity} from "../entities/Users.entity";
interface RequestWithUser extends Request {
  user: UsersEntity;
}

export default RequestWithUser;
