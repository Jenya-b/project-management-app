import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TaskType,
  BoardType,
  IColumn,
  ITask,
  ColumnType,
  ModalAction,
} from '../../../modules/types';
import { DropResult } from 'react-beautiful-dnd';
import {
  getBoard,
  createColumn,
  createTask,
  updateTask,
  updateColumn,
  deleteColumn,
  deleteTask,
  updateColumnOrder,
  updateTaskOrder,
} from './boardThunks';

type BoardInitialState = {
  board: BoardType;
  error: null | string;
  isLoading: boolean;
  taskData: TaskType | null;
  columnData: ColumnType | null;
  modalAction: ModalAction;
  isTaskShown: boolean;
  dropResult: DropResult | null;
  isModalFormOpen: boolean;
};

const initialState: BoardInitialState = {
  board: { id: '', title: '', columns: [] },
  error: null,
  isLoading: true,
  taskData: null,
  columnData: null,
  modalAction: 'createColumn',
  isTaskShown: false,
  dropResult: null,
  isModalFormOpen: false,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState: initialState,
  reducers: {
    setIsModalFormOpen(state, action: PayloadAction<boolean>) {
      state.isModalFormOpen = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    setTaskData(state, action: PayloadAction<TaskType>) {
      state.taskData = action.payload;
    },

    setColumnData(state, action: PayloadAction<ColumnType>) {
      state.columnData = action.payload;
    },

    setIsTaskShown(state, action: PayloadAction<boolean>) {
      state.isTaskShown = action.payload;
    },

    setmodalAction(state, action: PayloadAction<ModalAction>) {
      state.modalAction = action.payload;
    },

    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    changeTaskOrder(state, action: PayloadAction<DropResult>) {
      const prevColumn = state.board.columns.find(
        (item) => item.id === action.payload.source.droppableId
      );
      const currentColumn = state.board.columns.find(
        (item) => item.id === action?.payload?.destination?.droppableId
      );
      const prevOrder = action.payload.source.index;
      const currentOrder = action?.payload?.destination?.index || 0;
      if (prevColumn && currentColumn) {
        const task = prevColumn.tasks[prevOrder];
        task.columnId = action?.payload?.destination?.droppableId || '';
        prevColumn.tasks.splice(prevOrder, 1);
        for (let i = prevOrder; i < prevColumn.tasks.length; i++) {
          prevColumn.tasks[i].order = i + 1;
        }
        currentColumn.tasks.splice(currentOrder, 0, task);
        for (let i = currentOrder; i < currentColumn.tasks.length; i++) {
          currentColumn.tasks[i].order = i + 1;
        }
      }
      state.dropResult = action.payload;
    },
    changeColumnOrder(state, action: PayloadAction<DropResult>) {
      const prevOrder = action.payload.source.index;
      const currentOrder = action?.payload?.destination?.index || 0;
      const column = state.board.columns[prevOrder];

      state.board.columns.splice(prevOrder, 1);
      state.board.columns.splice(currentOrder, 0, column);

      const start = currentOrder < prevOrder ? currentOrder : prevOrder;
      const end = currentOrder < prevOrder ? prevOrder : currentOrder;

      for (let i = start; i <= end; i++) {
        state.board.columns[i].order = i + 1;
      }
      state.dropResult = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoard.fulfilled, (state, action) => {
      state.error = null;
      action.payload.columns.sort((a, b) => a.order - b.order);
      action.payload.columns.forEach((column) => column.tasks.sort((a, b) => a.order - b.order));
      action.payload.columns.forEach((column) =>
        column.tasks.forEach((task) => (task.description = JSON.parse(task.description)))
      );
      state.board = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getBoard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBoard.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Failed to load data.';
    });
    builder.addCase(createColumn.fulfilled, (state, action) => {
      state.error = null;
      const column = action.payload as IColumn;
      column.tasks = [];
      state.board.columns.push(column);
    }),
      builder.addCase(createColumn.rejected, (state) => {
        state.error = 'Failed to create new column.';
      }),
      builder.addCase(createTask.fulfilled, (state, action) => {
        const column = state.board.columns.find((item) => item.id === action.payload.columnId);
        const task = action.payload as unknown as ITask;
        task.description = JSON.parse(task.description);
        if (column) {
          column.tasks.push(task);
          state.error = null;
        } else {
          state.error = 'Failed to create new task.';
        }
      }),
      builder.addCase(createTask.rejected, (state) => {
        state.error = 'Failed to create new task.';
      }),
      builder.addCase(deleteColumn.fulfilled, (state, action) => {
        state.error = null;
        for (let i = action.payload.order; i < state.board.columns.length; i++) {
          state.board.columns[i].order = i;
        }
        state.board.columns.splice(action.payload.order - 1, 1);
      }),
      builder.addCase(deleteColumn.rejected, (state) => {
        state.error = 'Failed to delete the column.';
      }),
      builder.addCase(updateColumnOrder.fulfilled, (state) => {
        state.error = null;
      }),
      builder.addCase(updateColumnOrder.rejected, (state) => {
        state.error = 'Failed to change column position.';
      }),
      builder.addCase(updateTaskOrder.fulfilled, (state) => {
        state.error = null;
      }),
      builder.addCase(updateTaskOrder.rejected, (state) => {
        state.error = 'Failed to change task position.';
      }),
      builder.addCase(deleteTask.fulfilled, (state, action) => {
        state.error = null;
        const column = state.board.columns.find((item) => item.id === action.payload.columnId);
        if (column) {
          for (let i = action.payload.order; i < column.tasks.length; i++) {
            column.tasks[i].order = i;
          }
          column.tasks.splice(action.payload.order - 1, 1);
          return;
        }
        state.error = 'Failed to delete the task.';
      }),
      builder.addCase(deleteTask.rejected, (state) => {
        state.error = 'Failed to delete the task.';
      }),
      builder.addCase(updateColumn.fulfilled, (state, action) => {
        state.error = null;
        const index = state.board.columns.findIndex((item) => item.id === action.payload.id);
        if (index >= 0) {
          (action.payload as IColumn).tasks = state.board.columns[index].tasks;
          const prevOrder = state.board.columns[index].order;
          const currentOrder = action.payload.order;
          if (prevOrder === currentOrder) {
            state.board.columns[index] = action.payload as IColumn;
            return;
          }
        }
        state.error = 'Failed to update the column.';
      }),
      builder.addCase(updateColumn.rejected, (state) => {
        state.error = 'Failed to update the column.';
      }),
      builder.addCase(updateTask.fulfilled, (state, action) => {
        state.error = null;
        const column = state.board.columns.find((item) => item.id === action.payload.columnId);
        if (column) {
          const index = column.tasks.findIndex((item) => item.id === action.payload.id);
          if (index >= 0) {
            const prevOrder = column.tasks[index].order;
            const currentOrder = action.payload.order;
            if (prevOrder === currentOrder) {
              const task = action.payload as unknown as ITask;
              task.description = JSON.parse(task.description);
              column.tasks[index] = task as unknown as ITask;
              return;
            }
          }
        }
        state.error = 'Failed to update the task.';
      }),
      builder.addCase(updateTask.rejected, (state) => {
        state.error = 'Failed to update the task.';
      });
  },
});

export const {
  setError,
  setmodalAction,
  setTaskData,
  setColumnData,
  setIsModalFormOpen,
  changeColumnOrder,
  changeTaskOrder,
  setIsTaskShown,
  setIsLoading,
} = boardSlice.actions;
export default boardSlice.reducer;
