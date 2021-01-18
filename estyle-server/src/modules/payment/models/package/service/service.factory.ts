import { Service } from './service.model';

export class ServiceFactory {
  static create(data?: any) {
    return new Service(data.title, data.description);
  }
}
