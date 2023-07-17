import { ApiConfig, RequestParams } from '@src/api/types';
import Services from '../services';

class APIService {
  private services: Services;
  private config: ApiConfig;
  private readonly defaultHeaders: Record<string, string>;


  constructor(services: Services, config: ApiConfig = {} as ApiConfig) {
    this.services = services;
    this.config = config;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * HTTP запрос
   * @param url
   *
   * @param method
   * @param headers
   * @param options
   * @returns {Promise<{}>}
   */
  async request<T>({ url, method = 'GET', headers = {}, ...options }: RequestParams): Promise<T> {
    if (!url.match(/^(http|\/\/)/)) url = this.config.baseUrl + url;
    const res = await fetch(url, {
      method,
      headers: { ...this.defaultHeaders, ...headers },
      ...options,
    });
    return { data: await res.json(), status: res.status, headers: res.headers } as T;
  }

  /**
   * Установка или сброс заголовка
   * @param name {String} Название заголовка
   * @param value {String|null} Значение заголовка
   */
  setHeader(name: string, value: string | null = null): void {
    if (value) {
      this.defaultHeaders[name] = value;
    } else if (this.defaultHeaders[name]) {
      delete this.defaultHeaders[name];
    }
  }
}

export default APIService;
