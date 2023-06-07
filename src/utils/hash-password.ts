import * as crypto from 'crypto';
import { compare, genSalt, hash } from 'bcrypt';
import { config } from "../config/config";

export async function hashMethod(password: string): Promise<string> {
  const salt = await genSalt();

  return hash(password, salt);
}

export const hashPwd = (p: string): string => {
  const hmac = crypto.createHmac('sha512', `config.JWT_SECRET`);
  hmac.update(p);
  return hmac.digest('hex');
};

export async function compareMethod(
  password: string,
  hashPassword: string,
): Promise<boolean> {
  return compare(password, hashPassword);
}
