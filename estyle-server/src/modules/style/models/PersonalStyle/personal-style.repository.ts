import { Model } from 'mongoose';
import { PersonalStyle } from './personal-style.model';
import { PersonalStyleFactory } from './personal-style.factory';
import { PersonalStyleInterface } from './personal-style.schema';

export class PersonalStyleRepository {
  constructor(
    private readonly PersonalStyleModel: Model<PersonalStyleInterface>,
  ) {}

  async create(bodytype: PersonalStyle) {
    try {
      const type = new this.PersonalStyleModel(bodytype);
      const saved = await type.save();
      return PersonalStyleFactory.create(saved);
    } catch (err) {
      throw err;
    }
  }

  async update(bodytype: PersonalStyle) {
    try {
      const updated = await this.PersonalStyleModel.findOneAndUpdate(
        { _id: bodytype.id },
        { $set: bodytype.toObject() },
        { new: true },
      );
      return PersonalStyleFactory.create(updated);
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string) {
    try {
      const found = await this.PersonalStyleModel.findOne({ _id: id, isArchived: false });
      return found && PersonalStyleFactory.create(found);
    } catch (err) {
      throw err;
    }
  }

  async find(where: any = {}) {
    try {
      const found = await this.PersonalStyleModel.find({
        ...where,
        isArchived: false,
      });
      return found && found.map((type) => PersonalStyleFactory.create(type));
    } catch (err) {
      throw err;
    }
  }
}
