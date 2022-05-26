import { Users } from './Users';
import { RequireAuth } from '../../components/routerWrapper/requiereAuth';

const UsersPage = () => (
  <RequireAuth>
    <Users />
  </RequireAuth>
);

export default UsersPage;
