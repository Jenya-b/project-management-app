import { Board } from './Board';
import { RequireUser } from '../../components/requireUser';

const BoardPage = () => (
  <RequireUser>
    <Board />
  </RequireUser>
);

export default BoardPage;
