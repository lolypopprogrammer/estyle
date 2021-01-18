import {Types} from 'mongoose';

export class Followers {
    constructor(
        public userId: String | any,
        public subId: String | any,
        public readonly id?: Types.ObjectId,
    ) {
    }

    toObject() {
        return {
            id: this.id,
            userId: this.userId,
            subId: this.subId
        };
    }

    toJson() {
        return {
            id: this.id,
            userId: this.userId,
            subId: this.subId,
        };
    }
}
