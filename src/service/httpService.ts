import { encodeBase64 } from '../utils';
import { IService, MessageEvent } from './types';
import fetch from 'node-fetch';
import { Config } from '../config';

export class HttpService implements IService {
  async publishMessage(messageEvent: MessageEvent, config: Config) {
    // const { subject, data } = messageEvent;
    const { applicationId, publicKey, secret } = config.getConfig();
    const { baseUrl, publishPath } = config;
    const url = `${baseUrl}${publishPath}`;

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
