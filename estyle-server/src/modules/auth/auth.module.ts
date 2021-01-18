import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/models/user/user.schema';
import { SendGridService } from '../../common/services/sendgrid.service';
import { ForgotSchema } from './models/forgot/forgot.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Forgot', schema: ForgotSchema }]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        // Expires time on seconds
        // 12 hours = 60 minutes * 12 hours * 60 seconds
        expiresIn: '43200s',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, SendGridService],
  exports: [AuthService],
})
export class AuthModule {}
