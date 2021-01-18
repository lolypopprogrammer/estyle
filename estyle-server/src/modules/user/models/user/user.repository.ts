import { Model } from 'mongoose';
import { User } from './user.model';
import { IUser } from './user.schema';
import { UserFactory } from './user.factory';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { BlobStorageService } from 'src/common/services/blob-storage.service';

export class UserRepository {
  constructor(
    private readonly UserModel: Model<IUser>,
    private readonly blobStorage?: BlobStorageService,
  ) {}

  async create(data: User) {
    try {
      const user = new this.UserModel(data);
      const saved = await user.save();
      return UserFactory.create(saved);
    } catch (err) {
      throw err;
    }
  }

  async update(user: User) {
    try {
      const updated = await this.UserModel.findOneAndUpdate(
        { _id: user.id },
        { $set: user.toObject() },
        { new: true },
      );
      return UserFactory.create(updated);
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string) {
    try {
      const found = await this.UserModel.findOne({ _id: id, isArchived: false });
      return found && UserFactory.create(found);
    } catch (err) {
      throw err;
    }
  }

  async findByEmail(email: string) {
    try {
      const found = await this.UserModel.findOne({ email, isArchived: false });
      return found && UserFactory.create(found);
    } catch (err) {
      throw err;
    }
  }

  async find(where: any = {}) {
    try {
      const found = await this.UserModel.find({
        ...where,
        isArchived: false,
      });
      return found && found.map((user) => UserFactory.create(user));
    } catch (err) {
      throw err;
    }
  }

  async uploadPhoto(file): Promise<string> {
    let filename = file.originalname;
    if (!['image/png', 'image/gif', 'image/jpeg'].includes(file.mimetype))
      throw new BadRequestException(`File type ${file.mimetype} not supported`);
    let num = 1;
    while (
      await this.blobStorage.getBlob(filename, process.env.STYLEGUIDE_VARIATION_BLOB_CONTAINER)
    ) {
      const splitName = file.originalname.split('.');
      splitName[splitName.length - 2] = `${splitName[splitName.length - 2]}-${num}`;
      filename = splitName.join('.');
      num += 1;
    }

    try {
      const url = await this.blobStorage.uploadToBlobStorage(
        filename,
        file.buffer,
        process.env.STYLEGUIDE_VARIATION_BLOB_CONTAINER,
      );
      if (!url) throw new InternalServerErrorException();

      return `styleguide-item/photo/${filename}`;
    } catch (err) {
      throw err;
    }
  }
}
