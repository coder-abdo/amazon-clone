import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/auth.decorator';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import { UserInterface } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: UserInterface) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }
}
