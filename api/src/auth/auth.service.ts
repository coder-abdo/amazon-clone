import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon from 'argon2';
import { UserInterface } from 'src/user/interfaces/user.interface';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    @InjectModel('User')
    private readonly user: Model<UserInterface>,
  ) {}
  async signup(authDto: AuthDto) {
    try {
      // check if the user existed
      const existedUser = await this.user.findOne({ email: authDto.email });
      if (existedUser) {
        throw new BadRequestException('user is already exist');
      }
      const hashedPassword = await argon.hash(authDto.password);
      const user = new this.user({
        password: hashedPassword,
        email: authDto.email,
        name: authDto.name,
      });
      delete user.password;
      await user.save();
      return this.singnToken(user.email);
    } catch (err) {
      throw new Error(err);
    }
  }
  async signin(authDto: Pick<AuthDto, 'email' | 'password'>) {
    // check if the user is existed
    const user = await this.user.findOne({
      email: authDto.email,
    });
    if (!user) {
      throw new ForbiddenException('user is not existed');
    }
    // check if the password matched
    const isMatching = await argon.verify(user.password, authDto.password);
    if (!isMatching) {
      throw new BadRequestException('email or password is incorrect');
    }
    return this.singnToken(user.email);
  }
  async singnToken(email: string) {
    const payload = {
      email,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '3600s',
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      access_token: token,
    };
  }
}
