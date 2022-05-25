import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { RootState } from '../../../store/store';
import { pathToPage } from '../../constants/constRoutes';

export const PassedAuth = ({ children }: { children: JSX.Element }) => {
  const { token } = useAppSelector((state: RootState) => state.loginReducer);
  const { homePath } = pathToPage;

  if (token) {
    return <Navigate to={`${homePath}`} replace />;
  }

  return children;
};
