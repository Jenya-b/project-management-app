import { useEffect } from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { Container, TextField, Button } from '@mui/material';
import { updateUser } from '../../../store/reducers/users/usersThunks';
import ErrorSnackbar from '../../components/errorSnackbar/errorSnackbar';
import { clearErrors } from '../../../store/reducers/users/usersSlice';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Loading } from '../../components/loading';

export type FormValues = {
  name: string;
  login: string;
  password: string;
};

export const EditProfile = () => {
  const { t } = useTranslation();
  const {
    currentUser,
    loading,
    errors: serverErrors,
  } = useAppSelector((state) => state.usersReducer);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { name: currentUser.name, login: currentUser.login } });

  const submitForm = (data: FormValues) => {
    const { name, login, password } = data;
    dispatch(updateUser({ id: currentUser.id, userData: { name, login, password } }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  return (
    <div className="main">
      <Container>
        {loading ? (
          <Loading isLoading={true} />
        ) : (
          <div>
            <form className="login-form" onSubmit={handleSubmit(submitForm)}>
              <div className="login-form__field">
                <TextField
                  label={t('nameFieldLabel')}
                  className="login-form__field-input"
                  type="text"
                  sx={{ marginTop: '1em' }}
                  {...register('name', { required: 'nameFieldRequiredError' })}
                  error={!!errors.name}
                  helperText={
                    errors.name ? t(String(errors.name?.message)) : t('nameFieldHelpText')
                  }
                />
              </div>
              <div className="login-form__field">
                <TextField
                  label={t('loginFieldLabel')}
                  className="login-form__field-input"
                  type="text"
                  autoComplete="userlogin"
                  sx={{ marginTop: '1em' }}
                  {...register('login', { required: 'loginFieldRequiredError' })}
                  error={!!errors.login}
                  helperText={
                    errors.login ? t(String(errors.login?.message)) : t('loginFieldSignUpHelpText')
                  }
                />
              </div>
              <div className="login-form__field">
                <TextField
                  label={t('passwordFieldLabel')}
                  className="login-form__field-input"
                  type="password"
                  autoComplete="new-password"
                  sx={{ marginTop: '1em' }}
                  {...register('password', { required: 'passwordFieldRequiredError' })}
                  error={!!errors.password}
                  helperText={
                    errors.password
                      ? t(String(errors.password?.message))
                      : t('passwordFieldSignUpHelpText')
                  }
                />
              </div>
              <Button type="submit" sx={{ marginTop: '1em' }}>
                {t('update')}
              </Button>
            </form>
          </div>
        )}
      </Container>
      <ErrorSnackbar messages={serverErrors} />
    </div>
  );
};
