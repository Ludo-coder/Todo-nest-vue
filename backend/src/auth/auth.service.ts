import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './entities/login.interface';
import { LoginDto } from './dto/login-dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
  async authenticateUser({ email, password }: LoginDto): Promise<User | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email, password },
      });
      if (!user) return null;

      return user;
    } catch (e) {
      console.error(
        `An error occured during an user authentication (email: ${email})`,
      );
      throw e;
    }
  }

  login(user: User): LoginResponse {
    const payload = { email: user.email };
    return new LoginResponse(this.jwtService.sign(payload), user);
  }
}
