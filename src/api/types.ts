export interface RequestParams {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: string;
}

interface ApiResponseHead {
  status: number;
  headers: Headers;
}

export interface BasicApiResponse<T> extends ApiResponseHead {
  data: {
    result: T;
  };
}

export interface ErrorApiResponse<T> extends ApiResponseHead {
  data: {
    error: T;
  };
}

export interface MultiDataApiResponse<T> extends ApiResponseHead {
  data: {
    result: {
      items: T[];
    }
  };
}

export interface MultiDataApiResponseWithCount<T> extends ApiResponseHead {
  data: {
    result: {
      items: T[];
      count: number;
    }
  };
}

export interface ApiConfig {
  baseUrl: string;
}
