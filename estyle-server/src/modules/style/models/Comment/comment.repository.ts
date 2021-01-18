import { Model } from 'mongoose';
import { Comment } from './comment.model';
import { CommentFactory } from './comment.factory';
import { CommentInterface } from './comment.schema';

export class CommentRepository {
    constructor(private readonly CommentModel: Model<CommentInterface>) {}

    async create(bodytype: Comment) {
        try {
            const type = new this.CommentModel(bodytype);
            const saved = await type.save();
            return CommentFactory.create(saved);
        } catch (err) {
            throw err;
        }
    }

    async update(bodytype: Comment) {
        try {
            const updated = await this.CommentModel.findOneAndUpdate(
                { _id: bodytype.id },
                { $set: bodytype.toObject() },
                { new: true }
            );
            return CommentFactory.create(updated);
        } catch (err) {
            throw err;
        }
    }

    async findById(id: string) {
        try {
            const found = await this.CommentModel.findOne({ _id: id });
            return found && CommentFactory.create(found);
        } catch (err) {
            throw err;
        }
    }

    async find(where: any = {}, { limit, skip }: any = {}) {
        try {
            const found = await this.CommentModel.find(where)
                .limit(limit)
                .skip(skip);
            return found && found.map((type) => CommentFactory.create(type));
        } catch (err) {
            throw err;
        }
    }

    async delete(id) {
        try {
            const found = await this.CommentModel.findOne(
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
