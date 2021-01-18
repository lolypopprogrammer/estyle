import { Types } from 'mongoose';
import { Comment } from './comment.model';

export class CommentFactory {
    static create(data?: any): Comment {
        return new Comment(
            data.content,
            data.author,
            data.createdOn,
            data._id && Types.ObjectId(data._id.toString())
        );
    }
}
