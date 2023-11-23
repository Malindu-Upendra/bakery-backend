import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../model/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtservice: JwtService,
  ) {}

  async createUser(
    name: string,
    nic: string,
    username: string,
    password: string,
  ): Promise<User> {
    try {
      const userexist = await this.userModel.findOne({ username });
      if (userexist) {
        throw new BadRequestException('User Already Exist');
      }
      const hashedpassword = await bcrypt.hash(password, 12);
      const createduser = await this.userModel.create({
        name,
        nic,
        username,
        password: hashedpassword,
      });
      return createduser.save();
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new BadRequestException('Invalid Username');
    } else if (!(await bcrypt.compare(password, (await user).password))) {
      throw new BadRequestException('Invalid Password');
    }
    //console.log(user._id.toString());
    else {
      const userToken = await this.jwtservice.signAsync({
        id: user._id.toString(),
        username: user.username,
      });

      return { userToken };
    }
  }
}
