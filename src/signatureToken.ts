import * as crypto from 'crypto';

const HASH_FUNCTION = 'sha256';
export class SignatureToken {
  constructor(public pk: string, private sk: string) {}

  /**
   *
   * @param data - hash of data to Sign
   */
  public sign(dataHash: string) {
    return crypto.sign(HASH_FUNCTION, Buffer.from(dataHash), {
      key: this.sk,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    });
  }

  public verify(dataHash: string, signature: NodeJS.ArrayBufferView): boolean {
    return crypto.verify(
      HASH_FUNCTION,
      Buffer.from(dataHash),
      {
        key: this.pk,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      },
      signature,
    );
  }
}
