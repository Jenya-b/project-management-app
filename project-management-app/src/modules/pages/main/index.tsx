import { Main } from './Main';
import { RequireAuth } from '../../components/routerWrapper/requiereAuth';

const MainPage = () => (
  <RequireAuth>
    <Main />
  </RequireAuth>
);

export default MainPage;
