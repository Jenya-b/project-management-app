export interface LoginState {
  token: string;
  loading: boolean;
  user: {
    id: string;
    login: string;
    name: string;
  };
  errors: string[];
}
