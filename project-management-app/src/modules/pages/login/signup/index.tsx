import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { signup } from '../../../../store/reducers/login/loginThunks';
import { TextField, Button } from '@mui/material';

export const SignUp = () => {
  const [name, setName] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { loading, user } = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();
  const [userCreated, setUserCreated] = useState<boolean>(false);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signup({ name, login, password }));
  };

  useEffect(() => {
    setUserCreated(!!user.id);
  }, [user]);

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
              />
            </div>
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

            {userCreated ? (
              <div>
                <p>Created user</p>
                <p>Id: {user.id}</p>
                <p>Name: {user.name}</p>
                <p>Login: {user.login}</p>
              </div>
            ) : (
              <Button type="submit">Sign up</Button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};
