import { login } from './store/reducers/login/loginSlice';
import { setCurrentUser } from './store/reducers/users/usersSlice';
import { store } from './store/store';
import { RouterWrapper } from './modules/components/routerWrapper/routerWrapper';
import { USER_DATA_KEY, TOKEN_KEY } from './modules/constants/constLocalStorage';

const token = localStorage.getItem(TOKEN_KEY);
store.dispatch(login(token));

const userDataJSON = localStorage.getItem(USER_DATA_KEY);
if (userDataJSON) {
  const userData = JSON.parse(userDataJSON);
  store.dispatch(setCurrentUser(userData));
}

export const App = () => {
  return <RouterWrapper />;
};
