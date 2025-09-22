import { User } from '@prisma/client';

export type SafeUser = Omit<User, 'password'>;

export class LoginResponse {
  access_token: string;
  user: SafeUser;

  constructor(access_token: string, user: User) {
    this.access_token = access_token;
    const { password, ...safeUser } = user;
    this.user = safeUser;
  }
}
