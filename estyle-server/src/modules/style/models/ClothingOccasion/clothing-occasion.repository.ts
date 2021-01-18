import { Model } from 'mongoose';
import { ClothingOccasionInterface } from './clothing-occasion.shema';
import { ClothingOccasion } from './clothing-occasion.model';
import { ClothingOccasionFactory } from './clothing-occasion.factory';

export class ClothingOccasionRepository {
  constructor(private readonly ClothingOccasionModel: Model<ClothingOccasionInterface>) {}

  async create(bodytype: ClothingOccasion) {
    try {
      const type = new this.ClothingOccasionModel(bodytype);
      const saved = await type.save();
      return ClothingOccasionFactory.create(saved);
    } catch (err) {
      throw err;
    }
  }

  async update(bodytype: ClothingOccasion) {
    try {
      const updated = await this.ClothingOccasionModel.findOneAndUpdate(
        { _id: bodytype.id },
        { $set: bodytype.toObject() },
        { new: true },
      );
      return ClothingOccasionFactory.create(updated);
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string) {
    try {
      const found = await this.ClothingOccasionModel.findOne({
        _id: id,
        isArchived: false,
      });
      return found && ClothingOccasionFactory.create(found);
    } catch (err) {
      throw err;
    }
  }

  async find(where: any = {}) {
    try {
      const found = await this.ClothingOccasionModel.find({
        ...where,
        isArchived: false,
      });
      return found && found.map((type) => ClothingOccasionFactory.create(type));
    } catch (err) {
      throw err;
    }
  }
}
