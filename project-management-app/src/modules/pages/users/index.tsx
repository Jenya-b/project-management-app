import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { RootState } from '../../../store/store';
import { fetchUsers } from '../../../store/reducers/users/usersThunks';
import { useEffect } from 'react';
import ErrorSnackbar from '../../components/errorSnackbar/errorSnackbar';

export const Users = () => {
  const {
    users,
    loading,
    errors: serverErrors,
  } = useAppSelector((state: RootState) => state.usersReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUsers = async () => {
      dispatch(fetchUsers());
    };

    getUsers().catch(console.error);
  }, [dispatch]);

  if (loading) return <main className="main">Loading...</main>;

  return (
    <main className="main">
      <h1>Users</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Login</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.login}</TableCell>
                <TableCell>{user.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ErrorSnackbar messages={serverErrors} />
    </main>
  );
};
