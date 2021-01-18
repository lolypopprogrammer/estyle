import { Model } from 'mongoose';
import { ClothingItem } from './clothing-item.model';
import { ClothingItemFactory } from './clothing-item.factory';
import { ClothingItemInterface } from './clothing-item.schema';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { BlobStorageService } from '../../../../common/services/blob-storage.service';

export class ClothingItemRepository {
  constructor(
    private readonly ClothingItemModel: Model<ClothingItemInterface>,
    private readonly blobStorage: BlobStorageService,
  ) {}

  async create(bodytype: ClothingItem) {
    try {
      const type = new this.ClothingItemModel(bodytype);
      const saved = await type.save();
      return ClothingItemFactory.create(saved);
    } catch (err) {
      throw err;
    }
  }

  async update(bodytype: ClothingItem) {
    try {
      const updated = await this.ClothingItemModel.findOneAndUpdate(
        { _id: bodytype.id },
        { $set: bodytype.toObject() },
        { new: true },
      );
      return ClothingItemFactory.create(updated);
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string) {
    try {
      const found = await this.ClothingItemModel.findOne({
        _id: id,
        isArchived: false,
      })
        .populate('category')
        .populate('brand')
        .populate('author');
      return found && ClothingItemFactory.create(found);
    } catch (err) {
      throw err;
    }
  }

  async find(where: any = {}, { limit, skip }: any = {}) {
    try {
      const found = await this.ClothingItemModel.find({
        ...where,
        isArchived: false,
      })
        .limit(limit)
        .skip(skip)
        .populate('category')
        .populate('brand')
        .populate('author');
      const total = await this.ClothingItemModel.count({
        ...where,
        isArchived: false,
      });
      return {
        total: total,
        data: found && found.map((type) => ClothingItemFactory.create(type)),
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
