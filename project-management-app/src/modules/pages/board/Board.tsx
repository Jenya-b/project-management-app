import {
  Typography,
  Box,
  Button,
  TextField,
  Alert,
  Snackbar,
  Dialog,
  DialogContent,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { PrimaryBtn } from '../../components/button/index';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { BasicModal } from '../../components/modal';
import {
  setError,
  setmodalAction,
  setIsModalFormOpen,
  changeColumnOrder,
  changeTaskOrder,
  setIsTaskShown,
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
import React, { useEffect, useState } from 'react';
import { Column } from '../../components/column';
import { BACKGROUND_COLOR, TEXT_FIELD_WIDTH } from '../../constants/constGlobal';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { ConfirmationDialog } from '../../components/confirmationDialog';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/header';
import { Loading } from '../../components/loading';
import { UserData } from '../../../utils/api/users/usersTypes';
import { TaskType } from '../../types';

export const Board = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isFullscreen, setisFullscreen] = useState<boolean>(document.fullscreen);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const {
    board,
    error,
    modalAction,
    taskData,
    columnData,
    isModalFormOpen,
    isTaskShown,
    dropResult,
    isLoading,
  } = useAppSelector((state) => state.boardReducer);
  const { projectId } = useAppSelector((state) => state.projectByIdReducer);
  const { currentUser: user } = useAppSelector((state) => state.usersReducer);
  const titleInput: React.RefObject<HTMLInputElement> = React.createRef();
  const taskDescription: React.RefObject<HTMLInputElement> = React.createRef();
  const assignMyself: React.RefObject<HTMLInputElement> = React.createRef();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  useEffect(() => {
    dispatch(getBoard());
  }, []);

  useEffect(() => {
    const result = dropResult;
    if (result) {
      if (result.type === 'task') {
        dispatch(updateTaskOrder(result));
      }
      if (result.type === 'column') {
        dispatch(updateColumnOrder(result));
      }
    }
  }, [dropResult]);

  const onFullscreen = () => {
    if (!document.fullscreen) {
      document.documentElement.requestFullscreen();
      return;
    }
    document.exitFullscreen();
  };

  const fullscreenHandler = () => {
    if (!document.fullscreen) {
      setisFullscreen(false);
      return;
    }
    setisFullscreen(true);
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', fullscreenHandler);
    return () => {
      document.removeEventListener('fullscreenchange', fullscreenHandler);
    };
  }, []);

  const closeFormModal = () => {
    setTitleError(false);
    setDescriptionError(false);
    dispatch(setIsModalFormOpen(false));
  };

  const getDate = () => {
    return new Date().toLocaleString();
  };

  const confirmAction = () => {
    const title = titleInput?.current?.value || '';
    const description = taskDescription?.current?.value || '';
    const columnId = taskData?.columnId || '';
    const order = taskData?.order || 0;
    const taskId = taskData?.id || '';
    console.log(assignMyself.current?.checked);
    switch (modalAction) {
      case 'createColumn': {
        if (!title) {
          setTitleError(true);
          break;
        }
        dispatch(createColumn({ title })).then(() => closeFormModal());
        break;
      }
      case 'createTask': {
        if (!title || !description) {
          if (!title) setTitleError(true);
          if (!description) setDescriptionError(true);
          break;
        }
        const desc = {
          description,
          creationDate: getDate(),
          lastModified: getDate(),
          authorId: user.id,
          authorName: user.name,
          assignees: [] as Array<UserData>,
        };
        if (assignMyself?.current?.checked) {
          desc.assignees.push(user);
        }
        dispatch(
          createTask({
            columnId,
            taskData: { title, description: JSON.stringify(desc), userId: user.id },
          })
        ).then(() => closeFormModal());
        break;
      }
      case 'updateTask': {
        if (!title || !description) {
          if (!title) setTitleError(true);
          if (!description) setDescriptionError(true);
          break;
        }
        let desc;
        if (taskData?.description) {
          desc = { ...taskData.description };
          desc.assignees = [...taskData.description.assignees];
          desc.description = description;
          desc.lastModified = getDate();
          const index = desc.assignees.findIndex((assignee) => assignee.id === user.id);
          if (!assignMyself?.current?.checked) {
            if (index >= 0) {
              desc.assignees.splice(index, 1);
            }
          } else {
            if (index < 0) {
              desc.assignees.push(user);
            }
          }
        }
        dispatch(
          updateTask({
            columnId,
            taskId,
            taskData: {
              title,
              order,
              description: JSON.stringify(desc),
              userId: user.id,
              boardId: projectId,
              columnId,
            },
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
            <Typography variant="h6" component="h3">
              {t('createColumnTypography')}
            </Typography>
            <Typography sx={{ mt: 2 }} variant="body1" component="p">
              {t('columnTitle')}
            </Typography>
            <TextField
              placeholder={t('title')}
              sx={{ mb: 4, mt: 1, width: TEXT_FIELD_WIDTH }}
              inputRef={titleInput}
              error={titleError}
              helperText={titleError ? t('titleErrorText') : ''}
              onFocus={() => setTitleError(false)}
            />
          </>
        );

      case 'createTask':
      case 'updateTask':
        return (
          <>
            <Typography variant="h6" component="h3">
              {t(`${modalAction}Typography`)}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ mt: 2 }} variant="body1" component="p">
                {t('taskTitle')}
              </Typography>
              <TextField
                placeholder={t('title')}
                defaultValue={taskData?.title}
                inputRef={titleInput}
                sx={{ mb: 2, mt: 1, width: TEXT_FIELD_WIDTH }}
                error={titleError}
                helperText={titleError ? t('titleErrorText') : ''}
                onFocus={() => setTitleError(false)}
              />
              <Typography sx={{ mt: 2 }} variant="body1" component="p">
                {t('taskDesc')}
              </Typography>
              <TextField
                placeholder={t('description')}
                multiline
                rows={5}
                defaultValue={taskData?.description.description}
                inputRef={taskDescription}
                sx={{ mb: 4, mt: 1, width: TEXT_FIELD_WIDTH }}
                error={descriptionError}
                helperText={descriptionError ? t('descriptionErrorText') : ''}
                onFocus={() => setDescriptionError(false)}
              />
              <FormControlLabel
                control={<Checkbox defaultChecked inputRef={assignMyself} />}
                label={t('assignMyself')}
              />
            </Box>
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
    }
    if (type === 'column') {
      dispatch(changeColumnOrder(result));
    }
  };
  return (
    <>
      <Header />
      <Box sx={{ backgroundColor: BACKGROUND_COLOR, height: 'calc(100vh - 10.5rem)' }}>
        <Box sx={{ mx: '2.3rem' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              my: '1.5rem',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontSize: '2.5rem' }} component="h1">
              {t('boardPageTitle')}
            </Typography>
            <Box sx={{ height: '3rem', display: 'flex' }}>
              <PrimaryBtn
                text={t('addColumnButton')}
                variant="contained"
                onClick={onClick}
              ></PrimaryBtn>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', columnGap: '1rem' }}>
            <Button
              sx={{ visibility: { xs: 'hidden', md: 'visible' } }}
              variant="outlined"
              onClick={onFullscreen}
              startIcon={isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            >
              {t('fullscreen')}
            </Button>
            <Button variant="outlined" onClick={goBack} startIcon={<ExitToAppIcon />}>
              {t('goBack')}
            </Button>
          </Box>
        </Box>
        {isLoading ? (
          <Loading isLoading={true} />
        ) : (
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
                        tasks={column.tasks as unknown as TaskType[]}
                      ></Column>
                    ))}
                  </div>
                )}
              </Droppable>
            </Box>
          </DragDropContext>
        )}
        <BasicModal
          isActive={isModalFormOpen}
          closeWindow={closeFormModal}
          confirmAction={confirmAction}
        >
          {getModalContent()}
        </BasicModal>
        <Dialog onClose={() => dispatch(setIsTaskShown(false))} open={isTaskShown}>
          <DialogContent sx={{ px: 10, py: 4, maxHeight: '20rem' }}>
            <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
              {taskData?.title}
            </Typography>
            <Typography variant="body1" component="p">
              {taskData?.description?.description} <br />
              {t('author')}: {taskData?.description?.authorName} <br />
              {t('created')}: {taskData?.description?.creationDate} <br />
              {t('lastModified')}: {taskData?.description?.lastModified} <br />
            </Typography>
            <Typography variant="body1" component="p">
              {t('assignee')}:{' '}
              {taskData?.description?.assignees.map((assignee) => `${assignee.name} `)}
            </Typography>
          </DialogContent>
        </Dialog>
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={clearError}>
          <Alert onClose={clearError} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};
