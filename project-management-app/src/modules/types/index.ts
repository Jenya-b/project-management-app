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
  onClick?: () => void;
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

export type BoardType = {
  id: string;
  title: string;
  columns: IColumn[];
};

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
}

export type ColumnType = {
  id: string;
  title: string;
  order: number;
};

export interface ITask {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: IFile[];
}

export interface IFile {
  filename: string;
  fileSize: number;
}

export type TaskType = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};

export type ModalAction =
  | 'createTask'
  | 'createColumn'
  | 'updateTask'
  | 'deleteTask'
  | 'deleteColumn';
