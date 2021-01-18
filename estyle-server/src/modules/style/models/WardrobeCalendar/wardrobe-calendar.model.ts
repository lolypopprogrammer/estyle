import {Types} from 'mongoose';

export class WardrobeCalendar {
    constructor(
        public author: Types.ObjectId | any,
        public outfit: Types.ObjectId | any,
        public date: Date,
        public readonly id?: Types.ObjectId,
    ) {
    }

    toObject() {
        return {
            id: this.id,
            outfit: this.outfit,
            author: this.author,
            date: this.date,
        };
    }

    toJson() {
        const origin = `${process.env.ORIGIN}:${process.env.PORT}`;
        return {
            id: this.id,
            outfit: {
                id: this.outfit._id,
                pictures: this.outfit.pictures.map((picture) => `${origin}/${picture}`),
            },
            author: this.author,
            date: this.date,
        };
    }
}
