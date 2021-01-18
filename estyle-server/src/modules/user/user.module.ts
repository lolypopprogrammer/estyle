import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user/user.schema';
import { AuthModule } from '../auth/auth.module';
import { BlobStorageService } from 'src/common/services/blob-storage.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), AuthModule],
  controllers: [UserController],
  providers: [BlobStorageService],
})
export class UserModule {}
