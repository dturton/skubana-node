import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import queryString from 'query-string';

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
      (response: AxiosResponse) => {
        return Promise.resolve(response);
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  }

  public async getOrderByOrderNumber(orderNumber: string): Promise<Types.Order> {
    const response: AxiosResponse = await this.api.get(`/v1.1/orders?orderNumber=${orderNumber}`);
    const order: Types.Order = response.data;
    return order;
  }

  public async cancelOrder(cancelRequest: Types.CancelOrderRequest): Promise<any> {
    const stringified = queryString.stringify(cancelRequest);
    const response: AxiosResponse = await this.api.post(`/v1/orders/cancel?${stringified}`);
    const order: Types.Order = response.data;
    return order;
  }

  public async getOrdersByWarehouse(warehouseId: number, limit: number): Promise<Types.Order[]> {
    const response: AxiosResponse = await this.api.get(
      `/v1.1/orders?status=AWAITING_SHIPMENT&warehouseId=${warehouseId}&limit=${limit}`,
    );
    const orders = response.data;
    return orders;
  }

  public async getOrders(params: Types.GetOrdersParams): Promise<Types.Order[]> {
    const stringified = queryString.stringify(params);
    const response: AxiosResponse = await this.api.get(`/v1.1/orders?${stringified}`);
    const orders = response.data;
    return orders;
  }

  public async updateOrder(updateRequest: Types.UpdateOrderParams[]): Promise<any> {
    const response: AxiosResponse = await this.api.post(`/v1/orders`, updateRequest);
    const order: Types.Order = response.data;
    return order;
  }

  public async createShipment(shipmentPayload: Types.SkubanaExternalShipmentPayload) {
    const response: AxiosResponse = await this.api.put(`/v1.1/shipment/external`, shipmentPayload);
    const shipment = response.data;
    return shipment;
  }
}

export { Types };
