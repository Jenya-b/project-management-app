import { Route, Routes } from 'react-router-dom';
import { Layout } from './modules/components/Layout';
import { pathToPage } from './modules/constants/constRoutes';
import { Main } from './modules/pages/main';
import { Users } from './modules/pages/users';
import { NotFound } from './modules/pages/notFound';
import { Project } from './modules/pages/project';
import { Login } from './modules/pages/login';
import { login } from './store/reducers/login/loginSlice';
import { store } from './store/store';

store.dispatch(login());

export const App = () => {
  const { homePath, projectPath, loginPath, signInPath, signUpPath, usersPath, notFoundPath } =
    pathToPage;

  return (
    <Routes>
      <Route path={homePath} element={<Layout />}>
        <Route index element={<Main />} />
        <Route path={projectPath} element={<Project />} />
        <Route path={signInPath} element={<Login tab="signin" />} />
        <Route path={signUpPath} element={<Login tab="signup" />} />
        <Route path={loginPath} element={<Login />} />
        <Route path={usersPath} element={<Users />} />
        <Route path={notFoundPath} element={<NotFound />} />
      </Route>
    </Routes>
  );
};
