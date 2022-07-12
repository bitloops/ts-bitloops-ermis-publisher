import { SERVICE_BASE_URL } from './../constants/index';
import { IService } from './types';
import { HttpService } from './httpService';

const baseUrl = SERVICE_BASE_URL;

const service: IService = new HttpService({
  baseUrl,
});

export { service };
