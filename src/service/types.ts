import { ErmisConfig } from '..';

export type MessageEvent = {
  subject: string;
  data: any;
};

export interface IService {
  publishMessage(messageEvent: MessageEvent, config: ErmisConfig): Promise<void>;
}
