import * as crypto from 'crypto';

export class SignatureToken {
  constructor(public pk: string, private secretKey: string) {}

  /**
   *
   * @param data - hash of data to Sign
   */
  public sign(dataHash: string) {
    return crypto.createHmac('sha256', this.secretKey).update(Buffer.from(dataHash)).digest('hex');
  }

  public verify(dataHash: string, signature: string): boolean {
    return this.sign(dataHash) === signature;
  }
}
