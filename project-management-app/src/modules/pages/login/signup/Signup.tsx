import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { signup } from '../../../../store/reducers/login/loginThunks';
import { Box, TextField, Button, List, ListItem, ListSubheader } from '@mui/material';
import ErrorSnackbar from '../../../components/errorSnackbar/errorSnackbar';
import { clearErrors, clearUserCreated } from '../../../../store/reducers/login/loginSlice';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Loading } from '../../../components/loading';

export type FormValues = {
  name: string;
  login: string;
  password: string;
};

export const SignUp = () => {
  const { t } = useTranslation();
  const {
    loading,
    newUser,
    token,
    errors: serverErrors,
  } = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();
  const [userCreated, setUserCreated] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const submitForm = (data: FormValues) => {
    const { name, login, password } = data;
    dispatch(signup({ name, login, password }));
  };

  useEffect(() => {
    setUserCreated(!!newUser.id);
  }, [newUser]);

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
      dispatch(clearUserCreated());
    };
  }, [dispatch]);

  if (token) {
    return <p>{t('userLoggedIn')}</p>;
  }

  if (loading) {
    return <Loading isLoading={true} />;
  }

  if (userCreated) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <List>
          <ListSubheader>{t('newUserCreated')}</ListSubheader>
          <ListItem>
            {t('id')}: {newUser.id}
          </ListItem>
          <ListItem>
            {t('nameFieldLabel')}: {newUser.name}
          </ListItem>
          <ListItem>
            {t('loginFieldLabel')}: {newUser.login}
          </ListItem>
        </List>
      </Box>
    );
  }

  return (
    <form className="login-form" onSubmit={handleSubmit(submitForm)}>
      <TextField
        label={t('nameFieldLabel')}
        className="login-form__field-input"
        type="text"
        sx={{ marginTop: '1em' }}
        {...register('name', { required: 'nameFieldRequiredError' })}
        error={!!errors.name}
        helperText={errors.name ? t(String(errors.name.message)) : t('nameFieldHelpText')}
      />
      <TextField
        label={t('loginFieldLabel')}
        className="login-form__field-input"
        type="text"
        autoComplete="userlogin"
        sx={{ marginTop: '1em' }}
        {...register('login', { required: 'loginFieldRequiredError' })}
        error={!!errors.login}
        helperText={errors.login ? t(String(errors.login.message)) : t('loginFieldSignUpHelpText')}
      />
      <TextField
        label={t('passwordFieldLabel')}
        className="login-form__field-input"
        type="password"
        autoComplete="new-password"
        sx={{ marginTop: '1em' }}
        {...register('password', { required: 'passwordFieldRequiredError' })}
        error={!!errors.password}
        helperText={
          errors.password ? t(String(errors.password.message)) : t('passwordFieldSignUpHelpText')
        }
      />
      <Button type="submit" sx={{ marginTop: '1em' }}>
        {t('signUpFormButtonText')}
      </Button>
      <ErrorSnackbar messages={serverErrors} />
    </form>
  );
};
