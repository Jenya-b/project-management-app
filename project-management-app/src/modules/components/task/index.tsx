import { useAppDispatch } from '../../../hooks/useAppDispatch';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../hooks/useAppSelector';
import {
  setTaskData,
  setIsModalFormOpen,
  setmodalAction,
  setIsTaskShown,
} from '../../../store/reducers/board/boardSlice';
import { ModalAction } from '../../../modules/types';
import { Typography, IconButton, Tooltip, Card, CardContent, CardActions } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { UserData } from '../../../utils/api/users/usersTypes';

type TaskProps = {
  id: string;
  title: string;
  order: number;
  description: {
    description: string;
    creationDate: string;
    lastModified: string;
    authorId: string;
    authorName: string;
    assignees: Array<UserData>;
  };
  columnId: string;
  userId: string;
};
export const Task = ({ id, title, order, description, columnId, userId }: TaskProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { projectId } = useAppSelector((state) => state.projectByIdReducer);
  const setData = () => {
    dispatch(
      setTaskData({
        title,
        description,
        order,
        columnId,
        boardId: projectId,
        userId,
        id,
      })
    );
  };

  const onClick = (action: ModalAction) => {
    dispatch(setmodalAction(action));
    setData();
    dispatch(setIsModalFormOpen(true));
  };

  const showTask = () => {
    setData();
    dispatch(setIsTaskShown(true));
  };

  return (
    <Draggable draggableId={id} index={order - 1}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            width: { xs: '11rem', md: '22rem' },
            ml: '1.5rem',
            mb: '1.5rem',
            position: 'relative',
          }}
        >
          <CardContent onClick={showTask}>
            <Typography
              gutterBottom
              variant="h5"
              component="h5"
              sx={{ pr: { xs: '0', md: '5rem' }, pt: { xs: '2rem', md: '0' } }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              color="text.secondary"
              sx={{ fontSize: '1.1rem' }}
            >
              {description.description.length > 100
                ? `${description.description.slice(0, 100)}...`
                : description.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing sx={{ position: 'absolute', right: '0', top: '0' }}>
            <Tooltip title={t('updateTaskButton')} onClick={() => onClick('updateTask')}>
              <IconButton aria-label="edit task">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('deleteTaskButton')}>
              <IconButton aria-label="delete task" onClick={() => onClick('deleteTask')}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      )}
    </Draggable>
  );
};
