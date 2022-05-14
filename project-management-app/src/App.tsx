import { Route, Routes } from 'react-router-dom';
import { Layout } from './modules/components/Layout';
import { pathToPage } from './modules/constants/constRoutes';
import { Main } from './modules/pages/main';
import { Project } from './modules/pages/project';
import { Login } from './modules/pages/login';

export const App = () => {
  const { homePath, projectPath, loginPath } = pathToPage;

  return (
    <Routes>
      <Route path={homePath} element={<Layout />}>
        <Route index element={<Main />} />
        <Route path={projectPath} element={<Project />} />
        <Route path={loginPath} element={<Login />} />
      </Route>
    </Routes>
  );
};
