import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import queryString from 'query-string';

import * as Types from './types';

export default class SkubanaApi {
  private api: AxiosInstance;
  private pendingRequests: number;
  private config: AxiosRequestConfig;

  public maxRequestsCount: number;
  public intervalMs: number;

  public constructor(token: string, config?: AxiosRequestConfig) {
    this.config = {
      baseURL: 'https://api.skubana.com',
      headers: { Authorization: `Bearer ${token}` },
    };

    this.pendingRequests = 0;
    this.maxRequestsCount = 4;
    this.intervalMs = 1000;
    this.api = axios.create(this.config);

    /**
     * Axios Request Interceptor
     */
    this.api.interceptors.request.use(configInfo => {
      return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          if (this.pendingRequests < this.maxRequestsCount) {
            this.pendingRequests++;
            clearInterval(interval);
            resolve(configInfo);
          }
        }, this.intervalMs);
      });
    });

    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        this.pendingRequests = Math.max(0, this.pendingRequests - 1);
        return Promise.resolve(response);
      },
      (error: AxiosError) => {
        this.pendingRequests = Math.max(0, this.pendingRequests - 1);
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

  public async getOrdersByWarehouse(warehouseId: number): Promise<Types.Order[]> {
    const response: AxiosResponse = await this.api.get(
      `/v1/orders?status=AWAITING_SHIPMENT&warehouseId=${warehouseId}`,
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
