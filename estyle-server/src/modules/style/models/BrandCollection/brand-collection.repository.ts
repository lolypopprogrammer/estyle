import { Model } from 'mongoose';
import { BrandCollection } from './brand-collection.model';
import { BrandCollectionFactory } from './brand-collection.factory';
import { BrandCollectionInterface } from './brand-collection.schema';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { BlobStorageService } from 'src/common/services/blob-storage.service';

export class BrandCollectionRepository {
  constructor(
    private readonly BrandCollectionModel: Model<BrandCollectionInterface>,
    private readonly blobStorage?: BlobStorageService,
  ) {}

  async create(bodytype: BrandCollection) {
    try {
      const type = new this.BrandCollectionModel(bodytype);
      const saved = await type.save();
      return BrandCollectionFactory.create(saved);
    } catch (err) {
      throw err;
    }
  }

  async update(bodytype: BrandCollection) {
    try {
      const updated = await this.BrandCollectionModel.findOneAndUpdate(
        { _id: bodytype.id },
        { $set: bodytype.toObject() },
        { new: true },
      );
      return BrandCollectionFactory.create(updated);
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string) {
    try {
      const found = await this.BrandCollectionModel.findOne({
        _id: id,
        isArchived: false,
      });
      return found && BrandCollectionFactory.create(found);
    } catch (err) {
      throw err;
    }
  }

  async find(where: any = {}, { limit, skip }: any = {}) {
    try {
      const found = await this.BrandCollectionModel.find({
        ...where,
        isArchived: false,
      })
        .limit(limit)
        .skip(skip)
        .populate('author');
      const total = await this.BrandCollectionModel.count({
        ...where,
        isArchived: false,
      });
      return {
        total: total,
        data: found && found.map((type) => BrandCollectionFactory.create(type)),
      };
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
