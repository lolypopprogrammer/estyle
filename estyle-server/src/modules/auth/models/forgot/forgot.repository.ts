import { Model, Types } from 'mongoose';
import { IUser } from '../../../../modules/user/models/user/user.schema';
import { UserFactory } from '../../../../modules/user/models/user/user.factory';
import { User } from '../../../../modules/user/models/user/user.model';
import { ForgotFactory } from './forgot.factory';
import { IForgot } from './forgot.schema';
import { Forgot } from './forgot.model';

export class ForgotRepository {
  constructor(
    private readonly ForgotModel: Model<IForgot>,
  ) {}

  async create(user: User): Promise<Forgot> {
    const forgot = ForgotFactory.create({
      user: user.id,
    });
    forgot.generateToken();
    const model = new this.ForgotModel(forgot.toDocument());
    const saved = await model.save();
    return ForgotFactory.create(saved);
  }

  async findByToken(token: string): Promise<{forgot: Forgot; user: User }> {
    const found = await this.ForgotModel.findOne({ token }).populate('user');
    if (!found) return null;
    return {
      forgot: ForgotFactory.create({
        ...found,
        user: (found.user as unknown as IUser).id,
      }),
      user: UserFactory.create(found.user),
    };
  }

  async delete(id: Types.ObjectId): Promise<void> {
    await this.ForgotModel.findByIdAndDelete(id);
  }
}
