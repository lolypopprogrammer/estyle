import { Model } from 'mongoose';
import { ItemAttribute } from './item-attribute.model';
import { ItemAttributeFactory } from './item-attribute.factory';
import { IItemAttribute } from './item-attribute.schema';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { BlobStorageService } from '../../../../../common/services/blob-storage.service';
import { ItemAttributeDto } from '../../../../../modules/style/controllers/item-attribute/dto/item-attribute.dto';

export class ItemAttributeRepository {
  constructor(
    private readonly ItemAttributeModel: Model<IItemAttribute>,
    private readonly blobStorage: BlobStorageService,
  ) {}

  async create(bodytype: ItemAttribute) {
    try {
      const type = new this.ItemAttributeModel(bodytype);
      const saved = await type.save();
      return ItemAttributeFactory.create(saved);
    } catch (err) {
      throw err;
    }
  }

  async update(bodytype: ItemAttribute) {
    try {
      const updated = await this.ItemAttributeModel.findOneAndUpdate(
        { _id: bodytype.id },
        // @ts-ignore
        { $set: bodytype.toObject() },
        { new: true },
      );
      return ItemAttributeFactory.create(updated);
    } catch (err) {
      throw err;
    }
  }

  async uploadPhoto(id, file): Promise<ItemAttributeDto> {
    let filename = file.originalname;
    if (
      !['image/png', 'image/gif', 'image/jpeg'].includes(file.mimetype)
    ) throw new BadRequestException(`File type ${file.mimetype} not supported`);
    let num = 1;
    while (await this.blobStorage.getBlob(filename, process.env.VARIATIONS_BLOB_CONTAINER)) {
      const splitName = file.originalname.split('.');
      splitName[splitName.length - 2] = `${splitName[splitName.length - 2]}-${num}`;
      filename = splitName.join('.');
      num += 1;
    }

    try {
      const attribute = await this.findById(id);

      const url = await this.blobStorage.uploadToBlobStorage(filename, file.buffer, process.env.VARIATIONS_BLOB_CONTAINER);
      if (!url) throw new InternalServerErrorException();

      if (!attribute.pictures) attribute.pictures = [];
      attribute.pictures = [`item-attribute/${id}/photo/${filename}`];
      const updated = await this.update(attribute);
      return updated.toJson();
    } catch (err) {
      throw err;
    }
  }

  async getPhoto(filename: string) {
    return await this.blobStorage.getBlob(filename, process.env.VARIATIONS_BLOB_CONTAINER);
  }

  async findById(id: string) {
    try {
      const found = await this.ItemAttributeModel.findOne({ _id: id, isArchived: false });
      return found && ItemAttributeFactory.create(found);
    } catch (err) {
      throw err;
    }
  }

  async find(where: any = {}) {
    try {
      const found = await this.ItemAttributeModel.find({
        ...where,
        isArchived: false,
      });
      return found && found.map((type) => ItemAttributeFactory.create(type));
    } catch (err) {
      throw err;
    }
  }
}
