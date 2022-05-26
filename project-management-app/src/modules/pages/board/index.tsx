import { Typography, Box, Button, TextField, Alert, Snackbar } from '@mui/material';
import { PrimaryBtn } from '../../components/button/index';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { BasicModal } from '../../components/modal';
import {
  setError,
  setmodalAction,
  setIsModalFormOpen,
  changeColumnOrder,
  changeTaskOrder,
} from '../../../store/reducers/board/boardSlice';
import {
  getBoard,
  createColumn,
  createTask,
  deleteTask,
  deleteColumn,
  updateTask,
  updateTaskOrder,
  updateColumnOrder,
} from '../../../store/reducers/board/boardThunks';
import { useAppSelector } from '../../../hooks/useAppSelector';
import React, { useEffect } from 'react';
import { Column } from '../../components/column';
import { BACKGROUND_COLOR } from '../../constants/constGlobal';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { ConfirmationDialog } from '../../components/confirmationDialog';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const Board = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const { board, error, modalAction, taskData, columnData, isModalFormOpen } = useAppSelector(
    (state) => state.boardReducer
  );
  const { projectId } = useAppSelector((state) => state.projectByIdReducer);
  const { currentUser: user } = useAppSelector((state) => state.usersReducer);
  const titleInput: React.RefObject<HTMLInputElement> = React.createRef();
  const taskDescription: React.RefObject<HTMLInputElement> = React.createRef();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  useEffect(() => {
    dispatch(getBoard());
  }, []);

  const closeFormModal = () => {
    dispatch(setIsModalFormOpen(false));
  };

  console.log(user);

  const confirmAction = () => {
    const title = titleInput?.current?.value || '';
    const description = taskDescription?.current?.value || '';
    const columnId = taskData?.columnId || '';
    const order = taskData?.order || 0;
    const taskId = taskData?.id || '';

    switch (modalAction) {
      case 'createColumn': {
        dispatch(createColumn({ title })).then(() => closeFormModal());
        break;
      }
      case 'createTask': {
        dispatch(createTask({ columnId, taskData: { title, description, userId: user.id } })).then(
          () => closeFormModal()
        );
        break;
      }
      case 'updateTask': {
        dispatch(
          updateTask({
            columnId,
            taskId,
            taskData: { title, order, description, userId: user.id, boardId: projectId, columnId },
          })
        ).then(() => closeFormModal());
        break;
      }
      case 'deleteTask': {
        dispatch(deleteTask({ columnId, taskId, order })).then(() => closeFormModal());
        break;
      }
      case 'deleteColumn': {
        const columnId = columnData?.id || '';
        const order = columnData?.order || 0;
        dispatch(deleteColumn({ columnId, order })).then(() => closeFormModal());
        break;
      }
    }
  };

  const clearError = () => dispatch(setError(null));

  const getModalContent = () => {
    switch (modalAction) {
      case 'createColumn':
        return (
          <>
            <Typography variant="h5" component="h3">
              Column title:
            </Typography>
            <TextField hiddenLabel variant="filled" inputRef={titleInput} sx={{ mb: '2rem' }} />
          </>
        );

      case 'createTask':
      case 'updateTask':
        return (
          <>
            <Typography variant="h5" component="h3">
              Task title:
            </Typography>
            <TextField
              hiddenLabel
              variant="filled"
              defaultValue={taskData?.title}
              inputRef={titleInput}
              sx={{ mb: '2rem' }}
            />
            <Typography variant="h5" component="h3">
              Task description:
            </Typography>
            <TextField
              hiddenLabel
              multiline
              variant="filled"
              defaultValue={taskData?.description}
              inputRef={taskDescription}
              sx={{ mb: '2rem' }}
            />
          </>
        );
      case 'deleteTask':
        return <ConfirmationDialog title="titleModal" desc="deleteTaskModal" />;
      case 'deleteColumn':
        return <ConfirmationDialog title="titleModal" desc="deleteColumnModal" />;
    }
  };

  const onClick = () => {
    dispatch(setmodalAction('createColumn'));
    dispatch(setIsModalFormOpen(true));
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    if (type === 'task') {
      dispatch(changeTaskOrder(result));
      dispatch(updateTaskOrder(result));
      return;
    }
    if (type === 'column') {
      dispatch(changeColumnOrder(result));
      dispatch(updateColumnOrder(result));
      return;
    }
  };
  return (
    <Box sx={{ backgroundColor: BACKGROUND_COLOR, height: 'calc(100vh - 10.5rem)' }}>
      <Box sx={{ mx: '2.3rem' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: '1.5rem' }}>
          <Typography variant="h3" component="h1">
            Project Board
          </Typography>
          <PrimaryBtn text="add column" variant="contained" onClick={onClick}></PrimaryBtn>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', columnGap: '1rem' }}>
          <Button variant="outlined" startIcon={<FullscreenIcon />}>
            Fullscreen
          </Button>
          <Button variant="outlined" onClick={goBack} startIcon={<ExitToAppIcon />}>
            go back
          </Button>
        </Box>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ overflowX: 'auto', m: '2.3rem', mb: '0' }}>
          <Droppable droppableId="allColumns" direction="horizontal" type="column">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  minWidth: 'min-content',
                }}
              >
                {board.columns.map((column) => (
                  <Column
                    key={column.id}
                    id={column.id}
                    title={column.title}
                    order={column.order}
                    tasks={column.tasks}
                  ></Column>
                ))}
              </div>
            )}
          </Droppable>
        </Box>
      </DragDropContext>
      <BasicModal
        isActive={isModalFormOpen}
        closeWindow={closeFormModal}
        confirmAction={confirmAction}
      >
        {getModalContent()}
      </BasicModal>
      <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={clearError}>
        <Alert onClose={clearError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};
