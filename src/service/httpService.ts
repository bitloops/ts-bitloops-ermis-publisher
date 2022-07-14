import { encodeBase64 } from '../utils';
import { IService, MessageEvent } from './types';
import fetch, { Response } from 'node-fetch';
import { Config } from '../config';
import { PublishError } from './errors/PublishError';

export class HttpService implements IService {
  async publishMessage(messageEvent: MessageEvent, config: Config) {
    // const { subject, data } = messageEvent;
    const { applicationId, publicKey, secret } = config.getConfig();
    const { baseUrl, publishPath } = config;
    const url = `${baseUrl}${publishPath}`;

    // console.log(`Basic ${encodeBase64(publicKey + ':' + secret)}`);
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify({ applicationId, ...messageEvent }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodeBase64(publicKey + ':' + secret)}`,
      },
    });

    this.validateResponse(response);
  }

  private async validateResponse(response: Response): Promise<void> {
    if (response.ok) {
      // response.status >= 200 && response.status < 300
      return;
    }
    const { error } = await response.json();
    const { status } = response;
    throw new PublishError(error, status.toString());
  }
}
