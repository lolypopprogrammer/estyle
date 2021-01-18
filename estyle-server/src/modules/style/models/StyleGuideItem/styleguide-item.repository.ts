import { Model, Types } from 'mongoose';
import { StyleGuideItem } from './styleguide-item.model';
import { StyleGuideItemFactory } from './styleguide-item.factory';
import { IStyleGuideItem } from './styleguide-item.schema';
import { StyleGuideItemAttribute } from './Attributes/styleguide-item-attribute.model';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { BlobStorageService } from 'src/common/services/blob-storage.service';
import { StyleGuideItemAttributeFactory } from './Attributes/styleguide-item-attribute.factory';
import { StyleGuideItemAttributePostDto } from '../../controllers/styleguide-item/dto/styleguide-item-attribute-post.dto';
import { StyleGuideItemAttributePatchDto } from '../../controllers/styleguide-item/dto/styleguide-item-attribute-patch.dto';

export class StyleGuideItemRepository {
  constructor(
    private readonly StyleGuideItemModel: Model<IStyleGuideItem>,
    private readonly blobStorage: BlobStorageService,
  ) {}

  async create(styleGuideItem: StyleGuideItem) {
    try {
      const type = new this.StyleGuideItemModel(styleGuideItem);
      const saved = await type.save();
      return StyleGuideItemFactory.create(saved);
    } catch (err) {
      throw err;
    }
  }

  async update(styleGuideItem: StyleGuideItem) {
    try {
      const updated = await this.StyleGuideItemModel.findOneAndUpdate(
        { _id: styleGuideItem.id },
        // @ts-ignore
        { $set: styleGuideItem.toObject() },
        { new: true },
      );
      return StyleGuideItemFactory.create(updated);
    } catch (err) {
      throw err;
    }
  }

  async createAttribute(id: string, data: StyleGuideItemAttributePostDto, file: File) {
    const found = await this.findById(id);
    const picture = await this.uploadPhoto(file);
    found.attributes.push(StyleGuideItemAttributeFactory.create({
      attribute: data.attribute,
      description: data.description,
      type: data.type,
      picture,
    }));
    // @ts-ignore
    const saved = await this.StyleGuideItemModel.findByIdAndUpdate(found.id, { $set: found.toObject() }, { new: true });
    return StyleGuideItemFactory.create(saved);
  }

  async updateAttribute(id: string, data: StyleGuideItemAttributePatchDto, file: File) {
    const found = await this.findById(id);
    const index = found.attributes.findIndex(attr => attr.id.toString() === data.id);
    if (index < 0) {
      throw new BadRequestException('Attribute not found');
    }

    const update = { ...data };
    if (file) {
      const picture = await this.uploadPhoto(file);
      update.picture = picture;
    }

    for (const key of Object.keys(update)) {
      found.attributes[index][key] = update[key];
    }

    // @ts-ignore
    const saved = await this.StyleGuideItemModel.findByIdAndUpdate(found.id, { $set: found.toObject() }, { new: true });
    return StyleGuideItemFactory.create(saved);
  }

  async removeAttribute(itemId: string, id: string) {
    const found = await this.findById(itemId);
    const index = found.attributes.findIndex(attr => attr.id.toString() === id);
    if (index < 0) {
      throw new BadRequestException('Attribute not found');
    }
    found.attributes.splice(index, 1);
    // @ts-ignore
    const saved = await this.StyleGuideItemModel.findByIdAndUpdate(found.id, { $set: found.toObject() }, { new: true });
    return StyleGuideItemFactory.create(saved);
  }

  async findById(id: string) {
    try {
      const found = await this.StyleGuideItemModel.findOne({ _id: id, isArchived: false });
      return found && StyleGuideItemFactory.create(found);
    } catch (err) {
      throw err;
    }
  }

  async find(where: any = {}) {
    try {
      const found = await this.StyleGuideItemModel.find({
        ...where,
        isArchived: false,
      });
      return found && found.map((type) => StyleGuideItemFactory.create(type));
    } catch (err) {
      throw err;
    }
  }

  async getPhoto(filename: string) {
    return await this.blobStorage.getBlob(filename, process.env.STYLEGUIDE_VARIATION_BLOB_CONTAINER);
  }

  private async uploadPhoto(file): Promise<string> {
    let filename = file.originalname;
    if (
      !['image/png', 'image/gif', 'image/jpeg'].includes(file.mimetype)
    ) throw new BadRequestException(`File type ${file.mimetype} not supported`);
    let num = 1;
    while (await this.blobStorage.getBlob(filename, process.env.STYLEGUIDE_VARIATION_BLOB_CONTAINER)) {
      const splitName = file.originalname.split('.');
      splitName[splitName.length - 2] = `${splitName[splitName.length - 2]}-${num}`;
      filename = splitName.join('.');
      num += 1;
    }

    try {
      const url = await this.blobStorage.uploadToBlobStorage(filename, file.buffer, process.env.STYLEGUIDE_VARIATION_BLOB_CONTAINER);
      if (!url) throw new InternalServerErrorException();

      return `styleguide-item/photo/${filename}`;
    } catch (err) {
      throw err;
    }
  }
}
