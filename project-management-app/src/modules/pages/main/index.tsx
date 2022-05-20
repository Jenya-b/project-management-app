import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ListItemProject } from '../../components/listItemProject';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useEffect } from 'react';
import { fetchProjects } from '../../../store/reducers/projects/projectsThunks';

export const Main = () => {
  const { t } = useTranslation();
  const { projects } = useAppSelector((state) => state.projectsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getProjects = async () => {
      dispatch(fetchProjects());
    };

    getProjects().catch(console.error);
  }, []);

  const openBoard = () => {};

  const deleteBoard = () => {};

  return (
    <div className="main">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2, fontSize: '1.8rem' }} variant="h6">
              {t('ListOfProjects')}
            </Typography>
            <Box>
              <List>
                {projects.map(({ id, title }) => (
                  <ListItemProject
                    key={id}
                    title={title}
                    openBoard={openBoard}
                    deleteBoard={deleteBoard}
                  />
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
