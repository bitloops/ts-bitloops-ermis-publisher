import { service } from './service';
import { IService } from './service/types';
//import {INVALIDSUBJECT, INVALIDDATA} from '../constants/index'

export type ErmisConfig = {
  applicationId: string;
  publicKey: string;
  secret: string;
};

class Ermis {
  private config: ErmisConfig;
  private service: IService;

  constructor(private options: ErmisConfig) {
    this.config = options;
    this.service = service;
  }

  publish(subject: string, data: any) {
    if (!this.validateSubject(subject)) {
      throw new Error(`Subject is invalid: ${data}`);
    }

    if (!this.validateData(subject)) {
      throw new Error(`Data is invalid: ${data}`);
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
