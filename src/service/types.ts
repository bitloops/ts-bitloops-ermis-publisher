import { Config } from '../config';

export type MessageEvent = {
  subject: string;
  data: any;
};

export interface IService {
  publishMessage(messageEvent: MessageEvent, config: Config): Promise<void>;
}
