import * as crypto from 'crypto';

export const getMD5Hash = (str: string) => {
  return crypto.createHash('md5').update(str, 'utf8').digest('hex');
};
