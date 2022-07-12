export const encodeBase64 = (str: string) => {
  const buff = Buffer.from(str);
  return buff.toString('base64');
};

export const decodeBase64 = (data: string) => {
  const buff = Buffer.from(data, 'base64');
  return buff.toString('ascii');
};
