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
};

export type ConfirmationDialogType = {
  isActive: boolean;
  title: string;
  desc: string;
  closeWindow: () => void;
  confirmAction: () => void;
};
