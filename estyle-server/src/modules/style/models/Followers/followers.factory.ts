import {Types} from 'mongoose';
import { Followers } from './followers.model';

export class FollowersFactory {
    static create(data?: any): Followers {
        return new Followers(
            data.subId,
            data.userId,
            data._id && Types.ObjectId(data._id.toString()),
        );
    }
}
