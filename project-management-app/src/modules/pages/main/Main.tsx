import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ListItemProject } from '../../components/listItemProject';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useEffect, useState } from 'react';
import { deleteProject, fetchProjects } from '../../../store/reducers/projects/projectsThunks';
import { fetchProjectById } from '../../../store/reducers/projects/projectByIdThunks';
import { Loading } from '../../components/loading';
import { projectByIdSlice } from '../../../store/reducers/projects/projectByIdSlice';
import { PrimaryBtn } from '../../components/button';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import { BasicModal } from '../../components/modal';
import { ConfirmationDialog } from '../../components/confirmationDialog';
import { Header } from '../../components/header';
import { pathToPage } from '../../constants/constRoutes';
import { setIsLoading } from '../../../store/reducers/board/boardSlice';

export const Main = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { projects, isLoading } = useAppSelector((state) => state.projectsReducer);
  const { project, projectId } = useAppSelector((state) => state.projectByIdReducer);
  const dispatch = useAppDispatch();
  const { setProject, setProjectId } = projectByIdSlice.actions;
  const [isModalActive, setModalActive] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string>('');
  const { boardPath } = pathToPage;

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

  const handleClickList = (id: string) => {
    getProjectDescription(id);
    if (window.innerWidth < 900) {
      dispatch(setIsLoading(true));
      navigate(`/${boardPath}`);
    }
  };

  const getProjectDescription = async (id: string) => {
    dispatch(setProjectId(id));
    dispatch(fetchProjectById({ id }));
  };

  const openBoard = () => {
    dispatch(setIsLoading(true));
    navigate(`/${boardPath}`);
  };

  const deleteBoard = async (id: string) => {
    setCurrentId(id);
    setModalActive(true);
  };

  const closeConfirmationDialog = () => {
    setModalActive(false);
  };
  const confirmAction = () => {
    dispatch(deleteProject({ id: currentId }))
      .then(() => getProjects())
      .then(() => setModalActive(false));
  };

  return (
    <>
      <Header />
      <div className="main">
        <Container>
          <Grid container spacing={14}>
            <Grid item xs={12} md={6} className="project-desc-list">
              <Typography className="project-title" variant="h6">
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
                      openBoard={() => handleClickList(id)}
                      deleteBoard={() => deleteBoard(id)}
                    />
                  ))}
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} className="project-desc-wrapp">
              <Box className="project-sticky">
                <Typography className="project-title" variant="h6">
                  {t('projectDesc')}
                </Typography>
                <Stack spacing={2} sx={{ marginBottom: 4 }}>
                  <div className="project-desc">
                    {t('projectName')}: <span>{project.title}</span>
                  </div>
                  <div className="project-desc">
                    {t('projectDesc')}: <span>{project.description}</span>
                  </div>
                  <div className="project-desc">
                    {t('numberColumns')}: <span>{project.columns?.length}</span>
                  </div>
                </Stack>
                <PrimaryBtn variant="contained" text={t('openProject')} onClick={openBoard} />
              </Box>
            </Grid>
          </Grid>
        </Container>
        <BasicModal
          isActive={isModalActive}
          closeWindow={closeConfirmationDialog}
          confirmAction={confirmAction}
        >
          <ConfirmationDialog title="titleModal" desc={t('confirmDeleteProject')} />
        </BasicModal>
        <Loading isLoading={isLoading} />
      </div>
    </>
  );
};
