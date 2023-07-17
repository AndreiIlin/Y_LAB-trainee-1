import { BasicApiResponse } from '@src/api/types';
import { IProfileData, ProfileModuleState } from '@src/store/profile/types';
import StoreModule from '../module';

/**
 * Детальная информация о пользователе
 */
class ProfileState extends StoreModule<ProfileModuleState> {

  initState(): ProfileModuleState {
    return {
      data: {} as IProfileData,
      waiting: false, // признак ожидания загрузки
    };
  }

  /**
   * Загрузка профиля
   * @return {Promise<void>}
   */
  async load() {
    // Сброс текущего профиля и установка признака ожидания загрузки
    this.setState({
      data: {} as IProfileData,
      waiting: true,
    });

    const { data } = await this.services.api.request<BasicApiResponse<IProfileData>>({ url: `/api/v1/users/self` });

    // Профиль загружен успешно
    this.setState({
      data: data.result,
      waiting: false,
    }, 'Загружен профиль из АПИ');
  }
}

export default ProfileState;
