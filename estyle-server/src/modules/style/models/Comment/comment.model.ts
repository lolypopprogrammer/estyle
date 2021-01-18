import { Types } from 'mongoose';

export class Comment {
    constructor(
        public content: string,
        public author: Types.ObjectId | any,
        public createdOn: string,
        public readonly id?: Types.ObjectId
    ) {}

    toObject() {
        return {
            id: this.id,
            content: this.content,
            author: this.author,
        };
    }

    toJson() {
        return {
            id: this.id,
            content: this.content,
            author: this.author,
            createdOn: this.createdOn,
        };
    }
}
