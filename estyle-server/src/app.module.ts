import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { StyleModule } from './modules/style/style.module';
import { PaymentModule } from './modules/payment/payment.module';
import * as dotenv from 'dotenv';
import { VideoModule } from './modules/video/video.module';

dotenv.config({ path: '.env' });

const db = process.env.DATABASE_URL || 'mongodb://localhost:27017';


@Module({
  imports: [
    MongooseModule.forRoot(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }),
    AuthModule,
    UserModule,
    StyleModule,
    VideoModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
