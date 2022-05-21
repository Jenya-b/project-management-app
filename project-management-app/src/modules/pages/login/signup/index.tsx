import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { signup } from '../../../../store/reducers/login/loginThunks';
import { TextField, Button } from '@mui/material';
import ErrorSnackbar from '../../../components/errorSnackbar/errorSnackbar';
import { clearErrors } from '../../../../store/reducers/login/loginSlice';
import { useForm } from 'react-hook-form';

export type FormValues = {
  name: string;
  login: string;
  password: string;
};

export const SignUp = () => {
  const {
    loading,
    user,
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
    setUserCreated(!!user.id);
  }, [user]);

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
                label="Name"
                className="login-form__field-input"
                type="text"
                sx={{ marginTop: '1em' }}
                {...register('name', { required: 'Name is required!' })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : 'New user name'}
              />
            </div>
            <div className="login-form__field">
              <TextField
                label="Login"
                className="login-form__field-input"
                type="text"
                autoComplete="userlogin"
                sx={{ marginTop: '1em' }}
                {...register('login', { required: 'Login is required!' })}
                error={!!errors.login}
                helperText={errors.login ? errors.login.message : 'New user login'}
              />
            </div>
            <div className="login-form__field">
              <TextField
                label="Password"
                className="login-form__field-input"
                type="password"
                autoComplete="new-password"
                sx={{ marginTop: '1em' }}
                {...register('password', { required: 'Password is required!' })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : 'New user password'}
              />
            </div>
            <Button type="submit">Sign up</Button>
          </form>
          {!!userCreated && (
            <div>
              <p>Created user</p>
              <p>Id: {user.id}</p>
              <p>Name: {user.name}</p>
              <p>Login: {user.login}</p>
            </div>
          )}
        </div>
      )}
      <ErrorSnackbar messages={serverErrors} />
    </div>
  );
};
