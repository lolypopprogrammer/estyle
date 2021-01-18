import { Forgot } from './forgot.model';

export class ForgotFactory {
  static create(data: any) {
    return new Forgot(
      data.user,
      data.token,
      data.createdOn,
      data.id,
    );
  }
}
