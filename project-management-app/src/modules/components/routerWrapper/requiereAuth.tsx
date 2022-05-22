import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { RootState } from '../../../store/store';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { token } = useAppSelector((state: RootState) => state.loginReducer);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};
