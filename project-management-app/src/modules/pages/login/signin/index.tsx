import { useEffect } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { signin } from '../../../../store/reducers/login/loginThunks';
import { TextField, Button } from '@mui/material';
import ErrorSnackbar from '../../../components/errorSnackbar/errorSnackbar';
import { clearErrors } from '../../../../store/reducers/login/loginSlice';
import { useForm } from 'react-hook-form';

export type FormValues = {
  login: string;
  password: string;
};

export const SignIn = () => {
  const { loading, token, errors: serverErrors } = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const submitForm = (data: FormValues) => {
    const { login, password } = data;
    dispatch(signin({ login, password }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  if (token) {
    return <p>You are logged in</p>;
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
                label="Login"
                className="login-form__field-input"
                type="text"
                autoComplete="userlogin"
                sx={{ marginTop: '1em' }}
                {...register('login', { required: 'Login is required!' })}
                error={!!errors.login}
                helperText={errors.login ? errors.login.message : 'Your login'}
              />
            </div>
            <div className="login-form__field">
              <TextField
                label="Password"
                className="login-form__field-input"
                type="password"
                autoComplete="current-password"
                sx={{ marginTop: '1em' }}
                {...register('password', { required: 'Password is required!' })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : 'Your password'}
              />
            </div>

            <Button type="submit" sx={{ marginTop: '2em' }}>
              Sign in
            </Button>
          </form>
        </div>
      )}
      <ErrorSnackbar messages={serverErrors} />
    </div>
  );
};
