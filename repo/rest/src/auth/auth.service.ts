import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StoreService } from 'src/store/store.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly storeService: StoreService,
    private jwtService: JwtService,
  ) {}

  async validate(login: string, password: string) {
    return await this.storeService.validate(login, password);
  }

  signUp(login: string, password: string) {
    return this.storeService.createUser(login, password);
  }

  async signIn(login: string, password: string) {
    const user = await this.validate(login, password);
    return this.getTokens(user);
  }

  getTokens(user: User) {
    const payload = { login: user.login, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '24h' }),
    };
  }

  refresh(refreshToken: string) {
    return {
      accessToken: '',
      refreshToken: refreshToken,
    };
  }
}
