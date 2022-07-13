import { IService } from './types';
import { HttpService } from './httpService';

const service: IService = new HttpService();

export { service };
