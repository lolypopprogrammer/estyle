import { QuizMeasurements } from './measurements.model';

export class QuizMeasurementsFactory {
  static create(data: any) {
    return new QuizMeasurements(
      data.height,
      data.weight,
      data.shoulderSize,
      data.bustSize,
      data.waistSize,
      data.hipSize,
      data.wristSize,
      data.ankleSize,
      data.headToBustSize,
      data.bustToHipSize,
      data.hipToKneeSize,
      data.kneeToFloorSize,
      data.neckSize,
    );
  }
}
