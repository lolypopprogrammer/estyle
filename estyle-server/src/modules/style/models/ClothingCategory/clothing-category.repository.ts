import { Model } from 'mongoose';
import { ClothingCategory } from './clothing-category.model';
import { ClothingCategoryFactory } from './clothing-category.factory';
import { IClothingCategory } from './clothing-category.schema';
import { BlobStorageService } from 'src/common/services/blob-storage.service';

export class ClothingCategoryRepository {
  constructor(
    private readonly ClothingCategoryModel: Model<IClothingCategory>,
    private readonly blobStorage: BlobStorageService,
  ) {}

  async create(bodytype: ClothingCategory) {
    try {
      const type = new this.ClothingCategoryModel(bodytype);
      const saved = await type.save();
      return ClothingCategoryFactory.create(saved);
    } catch (err) {
      throw err;
    }
  }

  async update(bodytype: ClothingCategory) {
    try {
      const updated = await this.ClothingCategoryModel.findOneAndUpdate(
        { _id: bodytype.id },
        { $set: bodytype.toObject() },
        { new: true },
      );
      return ClothingCategoryFactory.create(updated);
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string) {
    try {
      const found = await this.ClothingCategoryModel.findOne({ _id: id, isArchived: false });
      return found && ClothingCategoryFactory.create(found);
    } catch (err) {
      throw err;
    }
  }

  async find(where: any = {}) {
    try {
      const found = await this.ClothingCategoryModel.find({
        ...where,
        isArchived: false,
      });
      return found && found.map((type) => ClothingCategoryFactory.create(type));
    } catch (err) {
      throw err;
    }
  }
}
