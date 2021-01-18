import { Model, Types } from 'mongoose';
import { Followers } from './followers.model';
import { FollowersFactory } from './followers.factory';
import { FollowersInterface } from './followers.schema';

export class FollowersRepository {
    constructor(private readonly FollowersModel: Model<FollowersInterface>) {}

    async create(bodytype: Followers) {
        try {
            const type = new this.FollowersModel(bodytype);
            const saved = await type.save();
            return FollowersFactory.create(saved);
        } catch (err) {
            throw err;
        }
    }

    async update(bodytype: Followers) {
        try {
            const updated = await this.FollowersModel.findOneAndUpdate(
                { _id: bodytype.id },
                { $set: bodytype.toObject() },
                { new: true }
            );
            return FollowersFactory.create(updated);
        } catch (err) {
            throw err;
        }
    }

    async findById(id: string) {
        try {
            const found = await this.FollowersModel.findOne({ _id: id });
            return found && FollowersFactory.create(found);
        } catch (err) {
            throw err;
        }
    }

    async find(where: any = {}) {
        try {
            const found = await this.FollowersModel.find(where);
            return found && found.map((type) => FollowersFactory.create(type));
        } catch (err) {
            throw err;
        }
    }

    async delete(id) {
        try {
            const found = await this.FollowersModel.findOne(
                { _id: id },
                (err, doc) => {
                    if (err) throw err;
                    doc.remove();
                }
            );
            return found;
        } catch (err) {
            throw err;
        }
    }
}
