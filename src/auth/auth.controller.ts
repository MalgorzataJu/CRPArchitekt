import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import RequestWithUser from '../utils/interfaces';
import {AuthLoginDto} from "./dto/auth-login.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() req: AuthLoginDto, @Res() res: Response): Promise<any> {
    return this.authService.login(req, res);
  }

  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() req: RequestWithUser, @Res() res: Response) {
    await this.authService.logout(req.user, res);
  }
}
