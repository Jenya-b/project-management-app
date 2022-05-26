import { EditProfile } from './EditProfile';
import { RequireAuth } from '../../components/routerWrapper/requiereAuth';
import { RequireUser } from '../../components/requireUser';

const EditProfilePage = () => (
  <RequireAuth>
    <RequireUser>
      <EditProfile />
    </RequireUser>
  </RequireAuth>
);

export default EditProfilePage;
