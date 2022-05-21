import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { signup } from '../../../../store/reducers/login/loginThunks';
import { TextField, Button } from '@mui/material';
import ErrorSnackbar from '../../../components/errorSnackbar/errorSnackbar';
import { clearErrors } from '../../../../store/reducers/login/loginSlice';

export const SignUp = () => {
  const [name, setName] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { loading, user, token, errors } = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();
  const [userCreated, setUserCreated] = useState<boolean>(false);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          <form className="login-form" onSubmit={submitForm}>
            <div className="login-form__field">
              <TextField
                label="Name"
                className="login-form__field-input"
                type="text"
                name="name"
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setName(event.target.value)
                }
                sx={{ marginTop: '2em' }}
              />
            </div>
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
                autoComplete="new-password"
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
                sx={{ marginTop: '2em' }}
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
      <ErrorSnackbar messages={errors} />
    </div>
  );
};
