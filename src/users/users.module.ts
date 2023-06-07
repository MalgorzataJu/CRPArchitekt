import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { TypeormImports } from '../typeorm';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [...TypeormImports, HttpModule],
  controllers: [AuthController, UsersController],
  providers: [

    AuthService,
    JwtStrategy,
    UsersService,
  ],
})
export class UsersModule {}
