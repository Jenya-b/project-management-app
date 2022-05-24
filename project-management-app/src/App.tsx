import { Route, Routes } from 'react-router-dom';
import { Layout } from './modules/components/Layout';
import { pathToPage } from './modules/constants/constRoutes';
import { Main } from './modules/pages/main';
import { NotFound } from './modules/pages/notFound';
import { Project } from './modules/pages/project';
import { Login } from './modules/pages/login';
import { Board } from './modules/pages/board';

export const App = () => {
  const { homePath, projectPath, loginPath, boardPath, notFoundPath } = pathToPage;

  return (
    <Routes>
      <Route path={homePath} element={<Layout />}>
        <Route index element={<Main />} />
        <Route path={projectPath} element={<Project />} />
        <Route path={loginPath} element={<Login />} />
        <Route path={boardPath} element={<Board />} />
        <Route path={notFoundPath} element={<NotFound />} />
      </Route>
    </Routes>
  );
};
