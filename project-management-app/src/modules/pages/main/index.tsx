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
import { fetchProjectById } from '../../../store/reducers/projects/projectByIdThunks';
import { Boards } from '../../../utils/api/boards/boards';
import { Loading } from '../../components/loading';
import { projectByIdSlice } from '../../../store/reducers/projects/projectByIdSlice';
import { PrimaryBtn } from '../../components/button';
import { Stack } from '@mui/material';
import './index.scss';

export const Main = () => {
  const { t } = useTranslation();
  const { projects, isLoading } = useAppSelector((state) => state.projectsReducer);
  const { project, projectId } = useAppSelector((state) => state.projectByIdReducer);
  const dispatch = useAppDispatch();
  const { setProject, setProjectId } = projectByIdSlice.actions;

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    try {
      if (projects.length) {
        getProjectDescription(projects[0].id);
        dispatch(setProject(projects[0]));
      }
    } catch (error) {
      console.error(error);
    }
  }, [projects]);

  const getProjects = async () => {
    dispatch(fetchProjects());
  };

  const getProjectDescription = async (id: string) => {
    dispatch(setProjectId(id));
    dispatch(fetchProjectById({ id }));
  };

  const openBoard = () => {};

  const deleteBoard = async (id: string) => {
    const token = localStorage.getItem('user_token');
    if (token) {
      await Boards.delete(id, token);
    }
    getProjects();
  };

  return (
    <div className="main">
      <Container>
        <Grid container spacing={14}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2, fontSize: '1.8rem' }} variant="h6">
              {t('ListOfProjects')}
            </Typography>
            <Box>
              <List>
                {projects.map(({ id, title }) => (
                  <ListItemProject
                    key={id}
                    id={id}
                    title={title}
                    activeProjectId={projectId}
                    openBoard={() => getProjectDescription(id)}
                    deleteBoard={() => deleteBoard(id)}
                  />
                ))}
              </List>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2, fontSize: '1.8rem' }} variant="h6">
              {t('projectDesc')}
            </Typography>
            <Stack spacing={2} sx={{ marginBottom: 4 }}>
              <div className="project-desc">
                {t('projectName')}: <span>{project.title}</span>
              </div>
              <div className="project-desc">
                {t('numberTask')}: <span>{project.columns?.length}</span>
              </div>
            </Stack>
            <PrimaryBtn variant="contained" text="Open project" onClick={openBoard} />
          </Grid>
        </Grid>
      </Container>
      <Loading isLoading={isLoading} />
    </div>
  );
};
