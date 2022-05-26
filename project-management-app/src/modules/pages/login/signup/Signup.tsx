import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { signup } from '../../../../store/reducers/login/loginThunks';
import { TextField, Button } from '@mui/material';
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

  return (
    <div className="container">
      {loading ? (
        <Loading isLoading={true} />
      ) : (
        <div>
          {!!userCreated ? (
            <div>
              <p>New user created</p>
              <p>Id: {newUser.id}</p>
              <p>Name: {newUser.name}</p>
              <p>Login: {newUser.login}</p>
            </div>
          ) : (
            <form className="login-form" onSubmit={handleSubmit(submitForm)}>
              <div className="login-form__field">
                <TextField
                  label={t('nameFieldLabel')}
                  className="login-form__field-input"
                  type="text"
                  sx={{ marginTop: '1em' }}
                  {...register('name', { required: 'nameFieldRequiredError' })}
                  error={!!errors.name}
                  helperText={errors.name ? t(String(errors.name.message)) : t('nameFieldHelpText')}
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
                    errors.login ? t(String(errors.login.message)) : t('loginFieldSignUpHelpText')
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
                      ? t(String(errors.password.message))
                      : t('passwordFieldSignUpHelpText')
                  }
                />
              </div>
              <Button type="submit" sx={{ marginTop: '1em' }}>
                {t('signUpFormButtonText')}
              </Button>
            </form>
          )}
        </div>
      )}
      <ErrorSnackbar messages={serverErrors} />
    </div>
  );
};
