import { SetMetadata } from '@nestjs/common';
import { UserRole } from "../../types";

export const Roles = (...args: UserRole[]) => SetMetadata('roles', args);
