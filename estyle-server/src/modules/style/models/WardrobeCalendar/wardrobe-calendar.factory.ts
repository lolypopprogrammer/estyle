import {Types} from 'mongoose';
import {WardrobeCalendar} from './wardrobe-calendar.model';

export class WardrobeCalendarFactory {
    static create(data?: any): WardrobeCalendar {
        return new WardrobeCalendar(
            data.author,
            data.outfit,
            data.date,
            data._id && Types.ObjectId(data._id.toString()),
        );
    }
}
