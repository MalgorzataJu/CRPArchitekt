import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { config } from 'src/config/config';
import { JwtPayload } from './jwt.strategy';
import { hashPwd } from "../utils/hash-password";
import {AuthLoginDto} from "./dto/auth-login.dto";
import {UsersEntity} from "../entities/Users.entity";
import process from "process";

@Injectable()
export class AuthService {
  private createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: string;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = config.JWT_EXPIRES_ACCESS;
    const accessToken = sign(
      payload,
      config.JWT_SECRET,

      { expiresIn },
    );
    return {
      accessToken,
      expiresIn,
    };
  }

  private async generateToken(user: UsersEntity): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await UsersEntity.findOne({
        where: { currentTokenId: token },
      });
    } while (!!userWithThisToken);
    user.currentTokenId = token;
    await user.save();
    return token;
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      console.log(req);
      const user = await UsersEntity.findOneBy({
          email: req.email,
          pwd: hashPwd(req.pwd),
      });
      if (!user) {
        return res.status(404).json({
          error: 'Nie znaleziono użytkownika o podanym e-mailu!',
          isAuthenticated: false
        });
      }
      if (!user.isActive) {
        return res.status(403).json({
          error: 'Your account is deactivated!',
          isAuthenticated: false
        });
      }
      const token = this.createToken(await this.generateToken(user));
      return res
        .cookie('jwt', token.accessToken, {
         // secure: true, //jeśli localHost to false jesli bedzie na stronie 'https' to wtedy true
         secure: config.NODE_ENV_SECURE=="true",
         // domain: config.DOMAIN,
         // domain: 'localhost', // zmienić na właściwy adres jeśli wypuszczamy na prod.
         // domain: '4pages.pl', // zmienić na właściwy adres jeśli wypuszczamy na prod.
          httpOnly: true,
        })
         .json({ isAuthenticated: true, id: user.id, role: user.role, email: user.email, date: new Date().getTime() });
    } catch (e) {
        return res.status(500).json({ error: 'Wystąpił problem z logowaniem, spróbuj ponownie.', isAuthenticated: false });
    }
  }

  async logout(user: UsersEntity, res: Response) {
    try {
      user.currentTokenId = null;
      await user.save();
      res.clearCookie('jwt', {
        secure: true,
        //secure: config.NODE_ENV_SECURE=="true",
        domain: config.DOMAIN,
        //domain: config.DOMAIN,
        //domain: 'localhost',
        // domain: '4pages.pl',
        httpOnly: true,
      });
      return res.json({ ok: true });
    } catch (e) {

      return res.json({ error: e.message });
    }
  }
}
