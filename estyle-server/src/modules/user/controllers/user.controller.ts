import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Patch,
  Param,
  NotFoundException,
  Delete,
  UseInterceptors,
  ForbiddenException,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from '../../auth/dto/login.dto';
import { UserFactory } from '../models/user/user.factory';
import { UserRepository } from '../models/user/user.repository';
import { IUser } from '../models/user/user.schema';
import { UserPostDto, UserPatchDto, ProfilePatchDto } from '../dto/user.dto';
import { User } from '../models/user/user.model';
import { JwtAuthGuard } from '../../../modules/auth/guards/jwt.guard';
import { CurrentUser } from '../../../common/decorators/user.decorator';
import { AuthService } from '../../../modules/auth/auth.service';
import { TransformInterceptor } from 'src/common/interceptor/transform.interceptor';
import { Role } from 'src/common/decorators/role.decorator';
import { UserRole } from '../dto/role.enum';
import { BlobStorageService } from 'src/common/services/blob-storage.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  repository: UserRepository;

  constructor(
    private authService: AuthService,
    @InjectModel('User') UserModel: Model<IUser>,
    private readonly blobStorageService: BlobStorageService,
  ) {
    this.repository = new UserRepository(UserModel, blobStorageService);
  }

  @ApiCreatedResponse({
    type: LoginDto,
  })
  @Post()
  async create(@Body() body: UserPostDto) {
    const user = UserFactory.create(body);
    await user.setPassword(body.password);
    const created = await this.repository.create(user);
    const token = await this.authService.sign({ sub: created.id });
    return {
      access_token: token,
      user: user.toJson(),
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: User,
    isArray: true,
  })
  @Get()
  async getUsers() {
    const found = await this.repository.find();
    return found && found.map((user) => user.toJson());
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: User,
  })
  @Get('me')
  async getCurrentUser(@CurrentUser() user: User) {
    return user.toJson();
  }

  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: User,
  })
  // @UseInterceptors(FileInterceptor('thumbnailBrandData'))
  @UseInterceptors(
    new TransformInterceptor(ProfilePatchDto),
    FileFieldsInterceptor([
      { name: 'thumbnailBrandData', maxCount: 1 },
      { name: 'backgroundBrandData', maxCount: 1 },
      { name: 'firstSliderPicture', maxCount: 1 },
      { name: 'secondSliderPicture', maxCount: 1 },
      { name: 'thirdSliderPicture', maxCount: 1 },
    ]),
    // FileInterceptor('backgroundBrandData'),
  )
  @Patch('me')
  async updateCurrentUser(
    @Body() body: UserPatchDto,
    @CurrentUser() user: User,
    @UploadedFiles() files: any,
  ) {
    let pictures = {};
    if (files.thumbnailBrandData) {
      pictures['thumbnailBrandData'] = await this.repository.uploadPhoto(
        files.thumbnailBrandData[0],
      );
    }
    if (files.backgroundBrandData) {
      pictures['backgroundBrandData'] = await this.repository.uploadPhoto(
        files.backgroundBrandData[0],
      );
    }
    if (files.firstSliderPicture) {
      pictures['firstSliderPicture'] = await this.repository.uploadPhoto(
        files.firstSliderPicture[0],
      );
    }
    if (files.secondSliderPicture) {
      pictures['secondSliderPicture'] = await this.repository.uploadPhoto(
        files.secondSliderPicture[0],
      );
    }
    if (files.thirdSliderPicture) {
      pictures['thirdSliderPicture'] = await this.repository.uploadPhoto(
        files.thirdSliderPicture[0],
      );
    }

    const updated = UserFactory.create({
      ...user.toObject(),
      ...body,
      ...pictures,
    });

    await this.repository.update(updated);
    return updated.toJson();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: User,
  })
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException('User not found');
    return found.toJson();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: User,
  })
  @UseInterceptors(new TransformInterceptor(UserPatchDto))
  @Patch(':id')
  async updateUserById(@Body() body: UserPatchDto, @Param('id') id: string, @Role() role: string) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException('User not found');
    if (body.role && role !== UserRole.ADMIN)
      throw new ForbiddenException("Only admin can change user's role");
    const updated = UserFactory.create({
      ...found.toObject(),
      ...body,
      id,
    });
    await this.repository.update(updated);
    return updated.toJson();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @Delete(':id')
  async archiveUserById(@Param('id') id: string) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException('User not found');
    const updated = UserFactory.create({
      ...found.toObject(),
      isArchived: true,
    });
    await this.repository.update(updated);
  }
}
