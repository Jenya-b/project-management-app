import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { signin } from '../../../../store/reducers/login/loginThunks';
import { TextField, Button } from '@mui/material';
import ErrorSnackbar from '../../../components/errorSnackbar/errorSnackbar';
import { clearErrors } from '../../../../store/reducers/login/loginSlice';

export const SignIn = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { loading, token, errors } = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          <form className="login-form" onSubmit={submitForm}>
            <div className="login-form__field">
              <TextField
                label="Login"
                className="login-form__field-input"
                type="text"
                name="login"
                autoComplete="userlogin"
                value={login}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setLogin(event.target.value)
                }
                sx={{ marginTop: '2em' }}
              />
            </div>
            <div className="login-form__field">
              <TextField
                label="Password"
                className="login-form__field-input"
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
                sx={{ marginTop: '2em' }}
              />
            </div>

            <Button type="submit" sx={{ marginTop: '2em' }}>
              Sign in
            </Button>
          </form>
        </div>
      )}
      <ErrorSnackbar messages={errors} />
    </div>
  );
};
