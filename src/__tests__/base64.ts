import { decodeBase64, encodeBase64 } from '../utils';
import { generateKeyPair } from 'crypto';

jest.setTimeout(20000);

test('base64', () => {
  const data = 'hello.com';
  const base64data = encodeBase64(data);
  const decodedData = decodeBase64(base64data);

  expect(data).toEqual(decodedData);
});

test('Authorization basic header', (done) => {
  generateKeyPair(
    'rsa',
    {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'top secret',
      },
    },
    async (err, publicKey, privateKey) => {
      // Handle errors and use the generated key pair.
      //   console.log('publicKey', publicKey);
      //   console.log('privateKey', privateKey);
      const authHeader = `Basic ${encodeBase64(publicKey + ':' + privateKey)}`;
      const [, payload] = authHeader.split(' ');
      // console.log(payload);
      const [publicKeyFromHeader, privateKeyFromHeader] = decodeBase64(payload).split(':');
      expect(publicKeyFromHeader).toEqual(publicKey);
      expect(privateKeyFromHeader).toEqual(privateKey);
      done();
    },
  );
});
