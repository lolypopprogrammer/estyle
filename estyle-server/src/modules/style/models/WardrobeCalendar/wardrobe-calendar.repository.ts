import { Model } from 'mongoose';
import { WardrobeCalendar } from './wardrobe-calendar.model';
import { WardrobeCalendarFactory } from './wardrobe-calendar.factory';
import { WardrobeCalendarInterface } from './wardrobe-calendar.schema';
import * as mongoose from 'mongoose';

export class WardrobeCalendarRepository {
  constructor(private readonly WardrobeCalendarModel: Model<WardrobeCalendarInterface>) {}

  async create(bodytype: WardrobeCalendar) {
    try {
      const type = new this.WardrobeCalendarModel(bodytype);
      const saved = await type.save();
      await saved
        .populate({
          path: 'outfit',
          select: 'id pictures',
        })
        .execPopulate();

      return WardrobeCalendarFactory.create(saved);
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string) {
    try {
      const found = await this.WardrobeCalendarModel.findOne({ _id: id }).populate({
        path: 'outfit',
        select: 'id pictures',
      });

      return found && WardrobeCalendarFactory.create(found);
    } catch (err) {
      throw err;
    }
  }

  async find(id: string, month: number, year: number) {
    try {
      let found = await this.WardrobeCalendarModel.aggregate([
        {
          $addFields: {
            month: {
              $month: {
                $add: [
                  '$date',
                  18000000, // Add 5 hour for specifying one time zone
                ],
              },
            },
            year: { $year: '$date' },
          },
        },
        {
          $match: {
            month: Number(month),
            year: Number(year),
            author: mongoose.Types.ObjectId(id),
          },
        },
      ]);
      found = await this.WardrobeCalendarModel.populate(found, {
        path: 'outfit',
        select: 'id pictures',
      });

      return found && found.map((type) => WardrobeCalendarFactory.create(type));
    } catch (err) {
      throw err;
    }
  }

  async delete(id) {
    try {
      return await this.WardrobeCalendarModel.findOne({ _id: id }, (err, doc) => {
        if (err) throw err;
        doc.remove();
      });
    } catch (err) {
      throw err;
    }
  }

  async updateById(item: WardrobeCalendar) {
    try {
      const updated = await this.WardrobeCalendarModel.findOneAndUpdate(
        { _id: item.id },
        { $set: item.toObject() },
        { new: true },
      ).populate({
        path: 'outfit',
        select: 'id pictures',
      });

      return WardrobeCalendarFactory.create(updated);
    } catch (err) {
      throw err;
    }
  }
}
