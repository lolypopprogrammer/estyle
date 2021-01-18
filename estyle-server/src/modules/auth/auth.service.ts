import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from '../user/models/user/user.repository';
import { IUser } from '../user/models/user/user.schema';
import { ForgotRepository } from './models/forgot/forgot.repository';
import { IForgot } from './models/forgot/forgot.schema';

@Injectable()
export class AuthService {
  repository: UserRepository;
  forgotRepository: ForgotRepository;

  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') UserModel: Model<IUser>,
    @InjectModel('Forgot') ForgotModel: Model<IForgot>,
  ) {
    this.repository = new UserRepository(UserModel);
    this.forgotRepository = new ForgotRepository(ForgotModel);
  }

  async sign(payload: any) {
    return this.jwtService.signAsync(payload, { expiresIn: '43200s' });
  }

  async findByEmail(email: string) {
    return this.repository.findByEmail(email);
  }

  async findById(id: string) {
    return this.repository.findById(id);
  }

  async forgot(email: string) {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    const forgot = await this.forgotRepository.create(user);
    return {
      user,
      forgot,
    };
  }

  async reset(token: string, password: string) {
    const data = await this.forgotRepository.findByToken(token);
    if (!data) {
      throw new BadRequestException('Token is not valid');
    }
    const { forgot, user } = data;
    await user.setPassword(password);
    await this.repository.update(user);
    await this.forgotRepository.delete(forgot.id);
    const accessToken = await this.sign({ sub: user.id });
    return {
      token: accessToken,
      user: user.toJson(),
    };
  }
}
