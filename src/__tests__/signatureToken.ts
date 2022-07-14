import { SignatureToken } from '../signatureToken';
import * as crypto from 'crypto';

jest.setTimeout(15000);

let publicKey: any, privateKey: any;
beforeAll(() => {
  // The `generateKeyPairSync` method accepts two arguments:
  // 1. The type ok keys we want, which in this case is "rsa"
  // 2. An object with the properties of the key
  const pair = crypto.generateKeyPairSync('rsa', {
    // The standard secure default length for RSA keys is 2048 bits
    modulusLength: 2048,
  });
  publicKey = pair.publicKey;
  privateKey = pair.privateKey;
});

// make simple test for SignatureToken
test('SignatureToken', () => {
  const dataHash = 'hello.com';
  const signatureToken = new SignatureToken(publicKey, privateKey);

  const signature = signatureToken.sign(dataHash);

  expect(signatureToken.verify(dataHash, signature)).toBe(true);
});

// make a simple negative test for SignatureToken

test('SignatureToken negative', () => {
  const dataHash = 'hello.com';
  const signatureToken = new SignatureToken(publicKey, privateKey);

  const signature = signatureToken.sign(dataHash);

  expect(signatureToken.verify('hell2.com', signature)).toBe(false);
});
