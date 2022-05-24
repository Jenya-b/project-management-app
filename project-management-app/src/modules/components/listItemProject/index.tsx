import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddchartIcon from '@mui/icons-material/Addchart';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListItemProjectType } from '../../types';

export const ListItemProject = ({
  id,
  title,
  activeProjectId,
  deleteBoard,
  openBoard,
}: ListItemProjectType) => (
  <ListItem
    secondaryAction={
      <IconButton edge="end" aria-label="delete" onClick={deleteBoard}>
        <DeleteIcon />
      </IconButton>
    }
    disablePadding
  >
    <ListItemButton
      sx={{ height: '5rem', borderBottom: '0.5px solid #c5c5c5' }}
      role={undefined}
      selected={id === activeProjectId}
      onClick={openBoard}
      dense
    >
      <ListItemAvatar>
        <Avatar>
          <AddchartIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography style={{ fontSize: '1.2rem', textTransform: 'uppercase' }}>
            {title}
          </Typography>
        }
      />
    </ListItemButton>
  </ListItem>
);
