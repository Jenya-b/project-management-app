import { useEffect } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { signin } from '../../../../store/reducers/login/loginThunks';
import { TextField, Button } from '@mui/material';
import ErrorSnackbar from '../../../components/errorSnackbar/errorSnackbar';
import { clearErrors } from '../../../../store/reducers/login/loginSlice';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { pathToPage } from '../../../constants/constRoutes';

export type FormValues = {
  login: string;
  password: string;
};

export const SignIn = () => {
  const { t } = useTranslation();
  const { loading, token, errors: serverErrors } = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const { homePath } = pathToPage;

  const submitForm = (data: FormValues) => {
    const { login, password } = data;
    dispatch(signin({ login, password }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      navigate(homePath);
    }
  }, [token]);

  if (token) {
    return <p>{t('userLoggedIn')}</p>;
  }

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <form className="login-form" onSubmit={handleSubmit(submitForm)}>
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
                  errors.login ? t(String(errors.login.message)) : t('loginFieldSignInHelpText')
                }
              />
            </div>
            <div className="login-form__field">
              <TextField
                label={t('passwordFieldLabel')}
                className="login-form__field-input"
                type="password"
                autoComplete="current-password"
                sx={{ marginTop: '1em' }}
                {...register('password', { required: 'passwordFieldRequiredError' })}
                error={!!errors.password}
                helperText={
                  errors.password
                    ? t(String(errors.password.message))
                    : t('passwordFieldSignInHelpText')
                }
              />
            </div>

            <Button type="submit" sx={{ marginTop: '1em' }}>
              {t('signInFormButtonText')}
            </Button>
          </form>
        </div>
      )}
      <ErrorSnackbar messages={serverErrors} />
    </div>
  );
};
