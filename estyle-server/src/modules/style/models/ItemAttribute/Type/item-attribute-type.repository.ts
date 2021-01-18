import { Model } from 'mongoose';
import { ItemAttributeType } from './item-attribute-type.model';
import { ItemAttributeTypeFactory } from './item-attribute-type.factory';
import { IItemAttributeType } from './item-attribute-type.schema';

export class ItemAttributeTypeRepository {
  constructor(
    private readonly ItemAttributeTypeModel: Model<IItemAttributeType>,
  ) {}

  async create(bodytype: ItemAttributeType) {
    try {
      const type = new this.ItemAttributeTypeModel(bodytype);
      const saved = await type.save();
      return ItemAttributeTypeFactory.create(saved);
    } catch (err) {
      throw err;
    }
  }

  async update(bodytype: ItemAttributeType) {
    try {
      const updated = await this.ItemAttributeTypeModel.findOneAndUpdate(
        { _id: bodytype.id },
        { $set: bodytype.toObject() },
        { new: true },
      );
      return ItemAttributeTypeFactory.create(updated);
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string) {
    try {
      const found = await this.ItemAttributeTypeModel.findOne({ _id: id, isArchived: false });
      return found && ItemAttributeTypeFactory.create(found);
    } catch (err) {
      throw err;
    }
  }

  async find(where: any = {}) {
    try {
      const found = await this.ItemAttributeTypeModel.find({
        ...where,
        isArchived: false,
      });
      return found && found.map((type) => ItemAttributeTypeFactory.create(type));
    } catch (err) {
      throw err;
    }
  }
}
