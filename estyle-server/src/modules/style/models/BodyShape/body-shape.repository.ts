import { Model } from 'mongoose';
import { BodyShape } from './body-shape.model';
import { BodyShapeFactory } from './body-shape.factory';
import { BodyShapeInterface } from './body-shape.schema';

export class BodyShapeRepository {
  constructor(
    private readonly BodyShapeModel: Model<BodyShapeInterface>,
  ) {}

  async create(bodytype: BodyShape) {
    try {
      const type = new this.BodyShapeModel(bodytype);
      const saved = await type.save();
      return BodyShapeFactory.create(saved);
    } catch (err) {
      throw err;
    }
  }

  async update(bodytype: BodyShape) {
    try {
      const updated = await this.BodyShapeModel.findOneAndUpdate(
        { _id: bodytype.id },
        { $set: bodytype.toObject() },
        { new: true },
      );
      return BodyShapeFactory.create(updated);
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string) {
    try {
      const found = await this.BodyShapeModel.findOne({ _id: id, isArchived: false });
      return found && BodyShapeFactory.create(found);
    } catch (err) {
      throw err;
    }
  }

  async find(where: any = {}) {
    try {
      const found = await this.BodyShapeModel.find({
        ...where,
        isArchived: false,
      });
      return found && found.map((type) => BodyShapeFactory.create(type));
    } catch (err) {
      throw err;
    }
  }
}
