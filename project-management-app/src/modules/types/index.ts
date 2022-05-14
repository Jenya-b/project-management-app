import { rootReducer, setupStore } from '../../store/store';

export type RootStateType = ReturnType<typeof rootReducer>;

export type AppStoreType = ReturnType<typeof setupStore>;

export type AppDispatchType = AppStoreType['dispatch'];

export type RoutesTypeProps = {
  homePath: string;
  projectPath: string;
};

export type ButtonType = {
  variant: 'text' | 'outlined' | 'contained' | undefined;
  text: string;
  onClick: () => void;
};

export type BasicModalType = {
  isActive: boolean;
  closeWindow: () => void;
  confirmAction: () => void;
  children: JSX.Element;
};

export type ConfirmationDialogType = {
  title: string;
  desc: string;
};
