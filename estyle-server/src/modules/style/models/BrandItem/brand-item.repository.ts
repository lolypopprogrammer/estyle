import { Model } from 'mongoose';
import { BrandItem } from './brand-item.model';
import { BrandItemFactory } from './brand-item.factory';
import { BrandItemInterface } from './brand-item.schema';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { BlobStorageService } from '../../../../common/services/blob-storage.service';

export class BrandItemRepository {
  constructor(
    private readonly BrandItemModel: Model<BrandItemInterface>,
    private readonly blobStorage: BlobStorageService,
  ) {}

  async create(bodytype: BrandItem) {
    try {
      const type = new this.BrandItemModel(bodytype);
      const saved = await type.save();
      return BrandItemFactory.create(saved);
    } catch (err) {
      throw err;
    }
  }

  async update(bodytype: BrandItem) {
    try {
      const updated = await this.BrandItemModel.findOneAndUpdate(
        { _id: bodytype.id },
        { $set: bodytype.toObject() },
        { new: true },
      );
      return BrandItemFactory.create(updated);
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string) {
    try {
      const found = await this.BrandItemModel.findOne({
        _id: id,
        isArchived: false,
      })
        .populate('author');
      return found && BrandItemFactory.create(found);
    } catch (err) {
      throw err;
    }
  }

  async find(where: any = {}, { limit, skip }: any = {}) {
    try {
      const found = await this.BrandItemModel.find({
        ...where,
        isArchived: false,
      })
        .limit(limit)
        .skip(skip)
        .populate('author');
      const total = await this.BrandItemModel.count({
        ...where,
        isArchived: false,
      });
      return {
        total: total,
        data: found && found.map((type) => BrandItemFactory.create(type)),
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
