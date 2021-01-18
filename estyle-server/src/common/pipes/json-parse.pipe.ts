import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class JsonParsePipe implements PipeTransform {
    constructor(private fieldName: string) {
    }

    transform(value: any, metadata: ArgumentMetadata) {
        if (value[this.fieldName]) {
            try {
                value[this.fieldName] = JSON.parse(value[this.fieldName]);
            } catch (e) {
                throw new Error('JsonParsePipe: Invalid input data');
            }
        }
        return value;
    }
}
