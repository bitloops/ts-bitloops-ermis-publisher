import { Config, ErmisOptions } from './config';
import { service } from './service';
import { IService } from './service/types';
import { INVALID_SUBJECT, INVALID_DATA } from './constants/index';

class Ermis {
  private config: Config;
  private service: IService;

  constructor(private options: ErmisOptions) {
    this.config = new Config(options);
    this.service = service;
  }

  publish(subject: string, data: any) {
    if (!this.validateSubject(subject)) {
      throw new Error(INVALID_SUBJECT + data);
    }

    if (!this.validateData(data)) {
      throw new Error(INVALID_DATA + data);
    }

    const eventMessage = {
      subject: subject,
      data,
    };
    return this.service.publishMessage(eventMessage, this.config);
  }

  private validateSubject(subject: string): boolean {
    return typeof subject === 'string';
  }

  private validateData(data: any) {
    return typeof data === 'object' && !Array.isArray(data) && data !== null;
  }
}

export default Ermis;
