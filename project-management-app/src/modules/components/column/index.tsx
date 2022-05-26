import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useState } from 'react';
import { TaskType } from '../../types';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { PRIMARY_COLOR, COLUMN_COLOR } from '../../constants/constGlobal';

import {
  Typography,
  Box,
  Button,
  List,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Tooltip,
} from '@mui/material';
import {
  setTaskData,
  setIsModalFormOpen,
  setmodalAction,
  setColumnData,
} from '../../../store/reducers/board/boardSlice';
import { updateColumn } from '../../../store/reducers/board/boardThunks';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { Task } from '../task';
import { Droppable, Draggable } from 'react-beautiful-dnd';

type ColumnProps = {
  id: string;
  title: string;
  order: number;
  tasks: TaskType[];
};

export const Column = ({ id, title, order, tasks }: ColumnProps) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const columnTitle: React.RefObject<HTMLInputElement> = React.createRef();
  const { projectId } = useAppSelector((state) => state.projectByIdReducer);
  const { currentUser: user } = useAppSelector((state) => state.usersReducer);

  const onConfirm = () => {
    dispatch(
      updateColumn({
        columnId: id,
        columnData: { title: columnTitle?.current?.value || '', order },
      })
    ).then(() => setIsEditing(false));
  };

  const onClick = () => {
    dispatch(setmodalAction('createTask'));
    dispatch(
      setTaskData({
        title: '',
        description: '',
        order: tasks.length,
        columnId: id,
        boardId: projectId,
        userId: user.id,
        id: '',
      })
    );
    dispatch(setIsModalFormOpen(true));
  };

  const del = () => {
    dispatch(setmodalAction('deleteColumn'));
    dispatch(setColumnData({ id, title, order }));
    dispatch(setIsModalFormOpen(true));
  };

  const onCancel = () => {
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={id} index={order - 1}>
      {(provided) => (
        <Box>
          <Box
            {...provided.draggableProps}
            ref={provided.innerRef}
            sx={{
              width: '25rem',
              height: 'calc(100vh - 26rem)',
              backgroundColor: COLUMN_COLOR,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              pb: '2.3rem',
              mr: '2rem',
            }}
          >
            <Box
              {...provided.dragHandleProps}
              sx={{
                display: 'flex',
                justifyContent: 'end',
                height: '3rem',
                width: '100%',
                alignItems: 'center',
                backgroundColor: PRIMARY_COLOR,
              }}
            >
              <Tooltip title="delete column">
                <IconButton aria-label="delete column" sx={{ color: '#ffffff' }} onClick={del}>
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            </Box>
            {isEditing ? (
              <OutlinedInput
                id="column-title"
                defaultValue={title}
                sx={{ width: '100%', fontSize: '1.5rem', fontWeight: '400' }}
                inputRef={columnTitle}
                autoFocus
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="change column title" onClick={onConfirm} edge="end">
                      <CheckCircleOutlineIcon />
                    </IconButton>
                    <IconButton aria-label="cancel changes" onClick={onCancel} edge="end">
                      <HighlightOffIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            ) : (
              <Typography
                variant="h5"
                component="p"
                sx={{ p: '1rem', width: '100%' }}
                onClick={() => setIsEditing(true)}
              >
                {title}
              </Typography>
            )}
            <Droppable droppableId={id} type="task">
              {(provided, snapshot) => (
                <List
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    width: '100%',
                    overflowY: 'auto',
                    height: '100%',
                    backgroundColor: snapshot.isDraggingOver ? 'rgba(48, 38, 185, .1)' : 'none',
                  }}
                >
                  {tasks.map((task, index) => (
                    <Task
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      order={task.order}
                      description={task.description}
                      columnId={id}
                      index={index}
                    />
                  ))}
                </List>
              )}
            </Droppable>
            <Button
              variant="text"
              disableRipple
              onClick={onClick}
              sx={{ position: 'absolute', bottom: '0', left: '0', color: PRIMARY_COLOR }}
              startIcon={<AddIcon />}
            >
              Add Card
            </Button>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};
