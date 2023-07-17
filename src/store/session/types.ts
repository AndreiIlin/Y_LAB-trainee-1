import { IProfileData } from '@src/store/profile/types';

export interface IValidationErrorIssue {
  path: string[];
  rule: string;
  message: string;
  accept: boolean;
}

export interface IRefreshErrorIssue {
  path: string;
  rule: string;
  message: string;
}

export interface ISessionError<T> {
  id: string;
  code: string;
  message: string;
  data: {
    issues: T[];
  };
}

export interface ISessionStateErrors {
  [key: string]: string[];
}

export interface SessionModuleState {
  user: IProfileData;
  token: string | null;
  errors: null | ISessionStateErrors;
  waiting: boolean;
  exists: boolean;
}

export interface SessionConfig {
  tokenHeader?: string;
}

export interface ISignInData {
  login: string;
  password: string;
}

export interface ISignInResponse {
  token: string;
  user: IProfileData;
}
