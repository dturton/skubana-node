import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as Types from './types';

export default class SkubanaApi {
  private api: AxiosInstance;
  private config: AxiosRequestConfig;

  public constructor(token: string, config?: AxiosRequestConfig) {
    this.config = {
      baseURL: 'https://api.skubana.com',
      headers: { Authorization: `Bearer ${token}` },
    };

    this.api = axios.create(this.config);

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: any) => {
        return Promise.reject(error);
      },
    );
  }

  public async getOrderByOrderNumber(orderNumber: string): Promise<Types.Order> {
    const response: AxiosResponse = await this.api.get(`/v1.1/orders?orderNumber=${orderNumber}`);
    const order: Types.Order = response.data;
    return order;
  }

  public async cancelOrder(canelRequest: Types.CancelOrderRequest): Promise<any> {
    const response: AxiosResponse = await this.api.post(`/v1/orders/cancel`, canelRequest);
    const order: Types.Order = response.data;
    return order;
  }
}

export { Types };
