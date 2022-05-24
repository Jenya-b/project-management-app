import { useAppDispatch } from '../../../hooks/useAppDispatch';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../../../hooks/useAppSelector';
import {
  setTaskData,
  setIsModalFormOpen,
  setmodalAction,
} from '../../../store/reducers/board/boardSlice';
import { ModalAction } from '../../../modules/types';
import { Typography, IconButton, Tooltip, Card, CardContent, CardActions } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';

type TaskProps = {
  id: string;
  title: string;
  order: number;
  description: string;
  columnId: string;
  index: number;
};
export const Task = ({ id, title, order, description, columnId }: TaskProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.loginReducer);
  const { projectId } = useAppSelector((state) => state.projectByIdReducer);

  const onClick = (action: ModalAction) => {
    dispatch(setmodalAction(action));
    dispatch(
      setTaskData({
        title,
        description,
        order,
        columnId,
        boardId: projectId,
        userId: user.id,
        id,
      })
    );
    dispatch(setIsModalFormOpen(true));
  };

  return (
    <Draggable draggableId={id} index={order - 1}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            width: '23rem',
            mx: '1rem',
            mb: '1.5rem',
            position: 'relative',
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h5" sx={{ pr: '5rem' }}>
              {title}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              color="text.secondary"
              sx={{ fontSize: '1.1rem' }}
            >
              {description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing sx={{ position: 'absolute', right: '0', top: '0' }}>
            <Tooltip title="edit task" onClick={() => onClick('updateTask')}>
              <IconButton aria-label="edit task">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="delete task">
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
