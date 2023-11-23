/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../model/user.entity';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post('createUser')
  async createUser(
    @Body('name') name: string,
    @Body('nic') nic: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.usersService.createUser(name, nic, username, password);
  }

  @Post('login')
  async login(@Body() user: any) {
    const userdata = await this.usersService.findOne(
      user.username,
      user.password,
    );

    return userdata;
  }
}
