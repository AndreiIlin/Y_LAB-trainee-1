import { existingModals } from '@src/app/modals';

export type ModalNames = keyof typeof existingModals;

export interface ModalItems {
  _id: string;
  title: string;
}

export interface ModalData {
  onClose: <T>(result?: T) => void;
  title: string;
  labelClose: string;
  labelLast?: string;
  labelFirst?: string;
  items?: ModalItems[];
}

export interface IModal {
  id: number;
  name: ModalNames;
  data: ModalData;
}

export interface ModalsModuleState {
  openedModals: IModal[];
  lastModalId: number;
}
