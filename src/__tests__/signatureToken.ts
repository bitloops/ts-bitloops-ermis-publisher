import { SignatureToken } from '../signatureToken';

jest.setTimeout(15000);

const key = 'abcd';
const secretKey = '2fx8cj2g69l7rot9lm1iv68r6i6wp4kx';

// make simple test for SignatureToken
test('SignatureToken', () => {
  const dataHash = 'hello.com';
  const signatureToken = new SignatureToken(key, secretKey);

  const signature = signatureToken.sign(dataHash);
  const result = signatureToken.verify(dataHash, signature);
  expect(result).toBeTruthy();
});

// make a simple negative test for SignatureToken

test('SignatureToken negative', () => {
  const dataHash = 'hello.com';
  const signatureToken = new SignatureToken(key, secretKey);

  const signature = signatureToken.sign(dataHash);

  expect(signatureToken.verify('hell2.com', signature)).toBe(false);
});
test('Check if sign is correct'),
  () => {
    const dataHash = 'hello';
    const expectedHash = '3f5f6aee17b5e98ab3849993425e7281704e994745c79509c10c66a8728353c9';
    const signatureToken = new SignatureToken(key, secretKey);
    const signature = signatureToken.sign(dataHash);
    expect(signature.toString).toBe(expectedHash);
  };
