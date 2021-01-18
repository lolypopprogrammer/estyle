import { Model } from 'mongoose';
import { Outfit } from './outfit.model';
import { OutfitFactory } from './outfit.factory';
import { OutfitInterface } from './outfit.schema';

import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { BlobStorageService } from '../../../../common/services/blob-storage.service';

export class OutfitRepository {
  constructor(
    private readonly OutfitModel: Model<OutfitInterface>,
    private readonly blobStorage: BlobStorageService,
  ) {}

  async create(bodytype: Outfit) {
    try {
      const type = new this.OutfitModel(bodytype);
      const saved = await type.save();
      return OutfitFactory.create(saved);
    } catch (err) {
      throw err;
    }
  }

  async update(bodytype: Outfit) {
    try {
      const updated = await this.OutfitModel.findOneAndUpdate(
        { _id: bodytype.id },
        { $set: bodytype.toObject() },
        { new: true },
      )
        .populate('author')
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
            select: 'role firstName lastName',
          },
        });
      return OutfitFactory.create(updated);
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string) {
    try {
      const found = await this.OutfitModel.findOne({
        _id: id,
        isArchived: false,
      })
        .populate('author')
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
            select: 'role firstName lastName',
          },
        });
      return found && OutfitFactory.create(found);
    } catch (err) {
      throw err;
    }
  }

  async find(where: any = {}, { limit, skip }: any = {}) {
    try {
      const found = await this.OutfitModel.find({
        ...where,
        isArchived: false,
      })
        .limit(limit)
        .skip(skip)
        .populate('author')
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
            select: 'role firstName lastName',
          },
        })
        .sort({ createdOn: 'desc' });
      const total = await this.OutfitModel.count({
        ...where,
        isArchived: false,
      });
      return {
        total: total,
        data: found && found.map((type) => OutfitFactory.create(type)),
      };
    } catch (err) {
      throw err;
    }
  }

  async getPhoto(filename: string) {
    return await this.blobStorage.getBlob(
      filename,
      process.env.STYLEGUIDE_VARIATION_BLOB_CONTAINER,
    );
  }

  async getLikes(id: string) {
    const found = await this.OutfitModel.find({
        author: id,
        isPublic: true,
        isArchived: false,
      }).select('likes');
    return found;
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
