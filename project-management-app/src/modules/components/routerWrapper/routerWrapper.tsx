import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../Layout';
import { pathToPage } from '../../constants/constRoutes';
import { Loading } from '../loading';

const BoardPage = React.lazy(() => import('../../pages/board'));
const EditProfilePage = React.lazy(() => import('../../pages/editProfile'));
const LoginPage = React.lazy(() => import('../../pages/login'));
const MainPage = React.lazy(() => import('../../pages/main'));
const NotFoundPage = React.lazy(() => import('../../pages/notFound'));
const UsersPage = React.lazy(() => import('../../pages/users'));
const WelcomePage = React.lazy(() => import('../../pages/welcome'));

export const RouterWrapper = () => {
  const {
    homePath,
    loginPath,
    signInPath,
    signUpPath,
    editProfilePath,
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
            <React.Suspense fallback={<Loading isLoading={true} />}>
              <MainPage />
            </React.Suspense>
          }
        />
        <Route
          path={loginPath}
          element={
            <React.Suspense fallback={<Loading isLoading={true} />}>
              <LoginPage />
            </React.Suspense>
          }
        />
        <Route
          path={signInPath}
          element={
            <React.Suspense fallback={<Loading isLoading={true} />}>
              <LoginPage tab="signin" />
            </React.Suspense>
          }
        />
        <Route
          path={signUpPath}
          element={
            <React.Suspense fallback={<Loading isLoading={true} />}>
              <LoginPage tab="signup" />
            </React.Suspense>
          }
        />
        <Route
          path={welcomePath}
          element={
            <React.Suspense fallback={<Loading isLoading={true} />}>
              <WelcomePage />
            </React.Suspense>
          }
        />
        <Route
          path={boardPath}
          element={
            <React.Suspense fallback={<Loading isLoading={true} />}>
              <BoardPage />
            </React.Suspense>
          }
        />
        <Route
          path={editProfilePath}
          element={
            <React.Suspense fallback={<Loading isLoading={true} />}>
              <EditProfilePage />
            </React.Suspense>
          }
        />
        <Route
          path={usersPath}
          element={
            <React.Suspense fallback={<Loading isLoading={true} />}>
              <UsersPage />
            </React.Suspense>
          }
        />
        <Route
          path={notFoundPath}
          element={
            <React.Suspense fallback={<Loading isLoading={true} />}>
              <NotFoundPage />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
};
