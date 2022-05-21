import { login } from './store/reducers/login/loginSlice';
import { store } from './store/store';
import { RouterWrapper } from './modules/components/routerWrapper/routerWrapper';

store.dispatch(login());

export const App = () => {
  return <RouterWrapper />;
};
