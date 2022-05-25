import { Route, Routes } from 'react-router-dom';
import { Layout } from '../Layout';
import { pathToPage } from '../../constants/constRoutes';
import { Main } from '../../pages/main';
import { Users } from '../../pages/users';
import { NotFound } from '../../pages/notFound';
import { Project } from '../../pages/project';
import { Login } from '../../pages/login';
import { RequireAuth } from './requiereAuth';
import { Welcome } from '../../pages/welcome';
import { Board } from '../../pages/board';
import { PassedAuth } from './passedAuth';

export const RouterWrapper = () => {
  const {
    homePath,
    projectPath,
    loginPath,
    signInPath,
    signUpPath,
    usersPath,
    notFoundPath,
    welcomePath,
    boardPath,
  } = pathToPage;

  return (
    <Routes>
      <Route path={homePath} element={<Layout />}>
        <Route
          index
          element={
            <RequireAuth>
              <Main />
            </RequireAuth>
          }
        />
        <Route
          path={projectPath}
          element={
            <RequireAuth>
              <Project />
            </RequireAuth>
          }
        />
        <Route path={loginPath} element={<Login />} />
        <Route
          path={signInPath}
          element={
            <PassedAuth>
              <Login tab="signin" />
            </PassedAuth>
          }
        />
        <Route
          path={signUpPath}
          element={
            <PassedAuth>
              <Login tab="signup" />
            </PassedAuth>
          }
        />
        <Route path={welcomePath} element={<Welcome />} />
        <Route path={boardPath} element={<Board />} />
        <Route
          path={usersPath}
          element={
            <RequireAuth>
              <Users />
            </RequireAuth>
          }
        />
        <Route path={notFoundPath} element={<NotFound />} />
      </Route>
    </Routes>
  );
};
