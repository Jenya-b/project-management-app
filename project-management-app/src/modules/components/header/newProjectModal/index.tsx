import { Box, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { createProject, fetchProjects } from '../../../../store/reducers/projects/projectsThunks';
import { TEXT_FIELD_WIDTH } from '../../../constants/constGlobal';
import { useForm } from 'react-hook-form';
import { BasicModal } from '../../modal';
import { pathToPage } from '../../../constants/constRoutes';
import { Loading } from '../../loading';
import { useEffect } from 'react';
import { projectsSlice } from '../../../../store/reducers/projects/projectsSlice';
import ErrorSnackbar from '../../errorSnackbar/errorSnackbar';

export type FormValues = {
  title: string;
  description: string;
};

interface NewProjectModalProps {
  isModalActive: boolean;
  closeConfirmationDialog: () => void;
  confirmAction: () => void;
}

export const NewProjectModal = ({
  isModalActive,
  closeConfirmationDialog,
  confirmAction,
}: NewProjectModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { homePath } = pathToPage;
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { newProjectCreated, newProjectCreating, newProjectErrors } = useAppSelector(
    (state) => state.projectsReducer
  );
  const { resetProjectCreated, clearNewProjectErrors } = projectsSlice.actions;

  const submitForm = (data: FormValues) => {
    const { title, description } = data;
    dispatch(createProject({ projectData: { title, description } }));
  };

  useEffect(() => {
    if (newProjectCreated) {
      dispatch(fetchProjects());
      navigate(homePath);
      dispatch(resetProjectCreated());
      confirmAction();
    }
  }, [newProjectCreated, dispatch, navigate, resetProjectCreated, confirmAction, homePath]);

  useEffect(() => {
    return () => {
      dispatch(clearNewProjectErrors());
    };
  }, [dispatch, clearNewProjectErrors]);

  return (
    <BasicModal
      isActive={isModalActive}
      closeWindow={closeConfirmationDialog}
      confirmAction={handleSubmit(submitForm)}
    >
      {newProjectCreating ? (
        <Loading isLoading={true} />
      ) : (
        <>
          <Typography variant="h6" component="h2">
            {t('newProjectTypography')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ mt: 2 }} variant="body1" component="p">
              {t('projectName')}
            </Typography>
            <TextField
              placeholder={t('title')}
              sx={{ mb: 2, mt: 1, width: TEXT_FIELD_WIDTH }}
              {...register('title', { required: 'projectTitleFieldRequiredError' })}
              error={!!errors.title}
              helperText={
                errors.title ? t(String(errors.title.message)) : t('projectTitleFieldHelpText')
              }
            />
            <Typography sx={{ mt: 1 }} variant="body1" component="p">
              {t('projectDesc')}
            </Typography>
            <TextField
              placeholder={t('description')}
              multiline
              rows={5}
              sx={{ mb: 4, mt: 1, width: '17.5rem' }}
              {...register('description', { required: 'projectDescriptionFieldRequiredError' })}
              error={!!errors.description}
              helperText={
                errors.description
                  ? t(String(errors.description.message))
                  : t('projectDescriptionFieldHelpText')
              }
            />
          </Box>
          <ErrorSnackbar messages={newProjectErrors} />
        </>
      )}
    </BasicModal>
  );
};
