import { ErmisConfig } from '..';
import { encodeBase64 } from '../utils';
import { IService, MessageEvent } from './types';
import fetch from 'node-fetch';

type Config = {
  baseUrl: string;
};

export class HttpService implements IService {
  constructor(private config: Config) {}

  async publishMessage(messageEvent: MessageEvent, config: ErmisConfig) {
    const { subject, data } = messageEvent;
    const { applicationId, publicKey, secret } = config;
    console.log('hi', subject, data);
    const url = `${this.config.baseUrl}/publish`;

    console.log(`Basic ${encodeBase64(publicKey + ':' + secret)}`);
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify({ applicationId, ...messageEvent }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodeBase64(publicKey + ':' + secret)}`,
      },
    });
    const responseData = await response.json();

    console.log(responseData);
  }
}
