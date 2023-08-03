import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { config } from '../config/config';
import {UsersEntity} from "../entities/Users.entity";

export interface JwtPayload {
  id: string;
}

function cookieExtractor(req: any): null | string {
  return req && req.cookies ? req.cookies?.jwt ?? null : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: config.JWT_SECRET,
    });
  }
  async validate(payload: JwtPayload, done: (error, user) => void) {
    if (!payload || !payload.id) {
      return done(new UnauthorizedException(), false);
    }
    const user = await UsersEntity.findOne({
      where: {
        currentTokenId: payload.id,
      },
    });
    if (!user.isActive) {
      return done(new UnauthorizedException(), false);
    }

    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }
}
