import { Login } from './Login';
import { PassedAuth } from '../../components/routerWrapper/passedAuth';
import { LoginProps } from './Login';

const LoginPage = (props: LoginProps) => (
  <PassedAuth>
    <Login {...props} />
  </PassedAuth>
);

export default LoginPage;
