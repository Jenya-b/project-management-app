import { useEffect } from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { fetchUsers } from '../../../store/reducers/users/usersThunks';
import { setCurrentUser } from '../../../store/reducers/users/usersSlice';
import { Loading } from '../../components/loading';
import { USER_DATA_KEY } from '../../constants/constLocalStorage';

export const RequireUser = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useAppSelector((state) => state.usersReducer);
  const { users } = useAppSelector((state) => state.usersReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentUserData = users.find((user) => user.login === currentUser.login);
    if (!currentUserData) {
      dispatch(fetchUsers());
    } else {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(currentUserData));
      dispatch(setCurrentUser(currentUserData));
    }
  }, [users, currentUser, dispatch]);

  if (!currentUser.id) {
    return <Loading isLoading={true} />;
  }

  return children;
};
