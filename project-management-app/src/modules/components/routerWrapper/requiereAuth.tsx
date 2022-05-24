import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { RootState } from '../../../store/store';
import { pathToPage } from '../../constants/constRoutes';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { token } = useAppSelector((state: RootState) => state.loginReducer);
  const { welcomePath } = pathToPage;

  if (!token) {
    return <Navigate to={`/${welcomePath}`} replace />;
  }

  return children;
};
