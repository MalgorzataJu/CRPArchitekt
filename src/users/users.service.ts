import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command, Console } from 'nestjs-console';
import { Repository } from 'typeorm';
import {UsersEntity} from "../entities/Users.entity";

@Injectable()
@Console({
  command: 'users',
  description: 'A command to manipulate users entities.',
})
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}


}
