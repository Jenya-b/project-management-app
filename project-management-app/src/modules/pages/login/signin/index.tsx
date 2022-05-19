import { useState } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { signin } from '../../../../store/reducers/login/loginThunks';
import { TextField, Button } from '@mui/material';

export const SignIn = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { loading, token } = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signin({ login, password }));
  };

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
                value={login}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setLogin(event.target.value)
                }
              />
            </div>
            <div className="login-form__field">
              <TextField
                label="Password"
                className="login-form__field-input"
                type="password"
                name="password"
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
              />
            </div>

            <Button type="submit">Sign in</Button>
          </form>
        </div>
      )}
    </div>
  );
};
