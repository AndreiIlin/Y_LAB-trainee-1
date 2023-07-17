import { BasicApiResponse, ErrorApiResponse } from '@src/api/types';
import { IProfileData } from '@src/store/profile/types';
import {
  IRefreshErrorIssue,
  ISessionError,
  ISignInData,
  ISignInResponse,
  IValidationErrorIssue,
  SessionConfig,
  SessionModuleState,
} from '@src/store/session/types';
import simplifyErrors from '@src/utils/simplify-errors';
import StoreModule from '../module';

/**
 * Сессия
 */
class SessionState extends StoreModule<SessionModuleState, SessionConfig> {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): SessionModuleState {
    return {
      user: {} as IProfileData,
      token: null,
      errors: null,
      waiting: true,
      exists: false,
    };
  }

  /**
   * Авторизация (вход)
   * @param data
   * @param onSuccess
   * @returns {Promise<void>}
   */
  async signIn(data: ISignInData, onSuccess: () => void) {
    this.setState(this.initState(), 'Авторизация');
    try {
      const res = await this.services.api.request<BasicApiResponse<ISignInResponse> | ErrorApiResponse<ISessionError<IValidationErrorIssue>>>({
        url: '/api/v1/users/sign',
        method: 'POST',
        body: JSON.stringify(data),
      });

      if ('result' in res.data) {
        this.setState({
          ...this.getState(),
          token: res.data.result.token,
          user: res.data.result.user,
          exists: true,
          waiting: false,
        }, 'Успешная авторизация');

        // Запоминаем токен, чтобы потом автоматически аутентифицировать юзера
        window.localStorage.setItem('token', res.data.result.token);

        // Устанавливаем токен в АПИ
        this.services.api.setHeader(this.config.tokenHeader || 'XToken', res.data.result.token);

        if (onSuccess) onSuccess();
      } else {
        this.setState({
          ...this.getState(),
          errors: simplifyErrors(res.data.error.data.issues),
          waiting: false,
        }, 'Ошибка авторизации');
      }

    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Отмена авторизации (выход)
   * @returns {Promise<void>}
   */
  async signOut() {
    try {
      await this.services.api.request<BasicApiResponse<true>>({
        url: '/api/v1/users/sign',
        method: 'DELETE',
      });
      // Удаляем токен
      window.localStorage.removeItem('token');
      // Удаляем заголовок
      this.services.api.setHeader(this.config.tokenHeader || 'XToken', null);
    } catch (error) {
      console.error(error);
    }
    this.setState({ ...this.initState(), waiting: false });
  }

  /**
   * По токену восстановление сессии
   * @return {Promise<void>}
   */
  async remind() {
    const token = localStorage.getItem('token');
    if (token) {
      // Устанавливаем токен в АПИ
      this.services.api.setHeader(this.config.tokenHeader || 'XToken', token);
      // Проверяем токен выбором своего профиля
      const res = await this.services.api.request<BasicApiResponse<IProfileData> | ErrorApiResponse<ISessionError<IRefreshErrorIssue>>>({ url: '/api/v1/users/self' });

      if ('error' in res.data) {
        // Удаляем плохой токен
        window.localStorage.removeItem('token');
        this.services.api.setHeader(this.config.tokenHeader || 'XToken', null);
        this.setState({
          ...this.getState(), exists: false, waiting: false,
        }, 'Сессии нет');
      } else {
        this.setState({
          ...this.getState(), token: token, user: res.data.result, exists: true, waiting: false,
        }, 'Успешно вспомнили сессию');
      }
    } else {
      // Если токена не было, то сбрасываем ожидание (так как по умолчанию true)
      this.setState({
        ...this.getState(), exists: false, waiting: false,
      }, 'Сессии нет');
    }
  }

  /**
   * Сброс ошибок авторизации
   */
  resetErrors() {
    this.setState({ ...this.initState(), errors: null });
  }
}

export default SessionState;
