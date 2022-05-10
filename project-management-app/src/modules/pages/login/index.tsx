import './index.scss';
import React from 'react';
import { Authorization } from '../../../utils/api/authorization';
import { Users, UserData } from '../../../utils/api/users';

type LoginPageProps = Record<string, never>;

interface LoginPageState {
  loading: boolean;
  name: string;
  login: string;
  password: string;
  users: UserData[];
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  constructor(props: LoginPageProps) {
    super(props);
    this.state = {
      loading: false,
      name: '',
      login: '',
      password: '',
      users: [],
    };
    this.signup = this.signup.bind(this);
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleLoginInputChange = this.handleLoginInputChange.bind(this);
    this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
  }

  async componentDidMount() {
    await this.updateUsersList();
  }

  private async updateUsersList() {
    const token = localStorage.getItem('user_token');
    if (token) {
      try {
        const users = await Users.getAll(token);
        this.setState({
          users: users,
        });
      } catch (err) {
        console.error(err);
      }
    }
  }

  async signup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    await Authorization.signup({
      name: this.state.name,
      login: this.state.login,
      password: this.state.password,
    });
    try {
      const data = await Authorization.signin({
        login: this.state.login,
        password: this.state.password,
      });
      localStorage.setItem('user_token', data.token);
    } catch (err) {
      console.error(err);
    }
    await this.updateUsersList();
    this.setState({
      loading: false,
    });
  }

  handleNameInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: event.target.value,
    });
  }

  handleLoginInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      login: event.target.value,
    });
  }

  handlePasswordInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: event.target.value,
    });
  }

  render() {
    const { loading, users, name, login, password } = this.state;
    const usersList = users.map((user) => <p key={user.id}>{user.name}</p>);
    return (
      <main className="main">
        <h1>Login</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <form className="login-form" onSubmit={this.signup}>
              <div className="login-form__field">
                <label htmlFor="name">Name:</label>
                <input
                  className="login-form__field-input"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleNameInputChange}
                />
              </div>
              <div className="login-form__field">
                <label htmlFor="login">Login:</label>
                <input
                  className="login-form__field-input"
                  type="text"
                  name="login"
                  value={login}
                  onChange={this.handleLoginInputChange}
                />
              </div>
              <div className="login-form__field">
                <label htmlFor="password">Password:</label>
                <input
                  className="login-form__field-input"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handlePasswordInputChange}
                />
              </div>

              <button>Signup</button>
            </form>
            <div>{usersList}</div>
          </div>
        )}
      </main>
    );
  }
}

export default LoginPage;
