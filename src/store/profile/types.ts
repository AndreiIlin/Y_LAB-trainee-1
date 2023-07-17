interface IProfile {
  name: string;
  surname: string;
  middlename: string;
  avatar: {
    _id: string;
    _type: string;
  },
  phone: string;
  birthday: string;
  position: string;
  country: {
    _id: string;
    _type: string;
  },
  city: {
    _id: string;
    _type: string;
  },
  street: string;
}

interface IProfileRoles {
  _id: string;
  _type: string;
}

export interface IProfileData {
  _id: string
  _type: string;
  order: number,
  dateCreate: string,
  dateUpdate: string,
  isDeleted: boolean,
  isNew: boolean,
  proto: {
    _id: string;
    _type: string;
  },
  email: string;
  username: string;
  roles: IProfileRoles[]
  status: string;
  profile: IProfile,
  _key: string;
}

export interface ProfileModuleState {
  data: IProfileData;
  waiting: boolean;
}
