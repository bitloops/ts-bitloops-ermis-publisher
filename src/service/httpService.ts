import { encodeBase64 } from '../utils';
import { IService, MessageEvent } from './types';
import fetch, { Response } from 'node-fetch';
import { Config } from '../config';
import { PublishError } from './errors/PublishError';
import { getMD5Hash } from '../hashUtils';
import { SignatureToken } from '../signatureToken';

type PublishBody = {
  event: MessageEvent;
  applicationId: string;
  auth: {
    /**
     * The hash of the event
     * @see MessageEvent
     */
    eventHash: string;
    publicKey: string;
    timestamp: number;
    /**
     * Signed on the eventHash and timestamp
     */
    signature: string;
  };
};

export class HttpService implements IService {
  async publishMessage(messageEvent: MessageEvent, config: Config) {
    // const { subject, data } = messageEvent;
    const { applicationId, publicKey, secret } = config.getConfig();
    const { baseUrl, publishPath } = config;
    const url = `${baseUrl}${publishPath}`;
    const body: PublishBody = this.buildBody(messageEvent, applicationId, publicKey, secret);

    // console.log(`Basic ${encodeBase64(publicKey + ':' + secret)}`);
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.validateResponse(response);
  }

  private buildBody(
    messageEvent: MessageEvent,
    applicationId: string,
    publicKey: string,
    secret: string,
  ): PublishBody {
    const timestamp = Date.now();
    const eventHash = getMD5Hash(JSON.stringify(messageEvent));

    const body: PublishBody = {
      event: messageEvent,
      applicationId,
      auth: {
        eventHash,
        publicKey,
        timestamp,
        signature: '',
      },
    };
    const signatureToken = new SignatureToken(publicKey, secret);

    body.auth.signature = signatureToken.sign(eventHash + timestamp);
    return body;
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
