import './index.scss';
import { SignIn } from './signin';
import { SignUp } from './signup';
import { Container, Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';

interface LoginProps {
  tab?: string;
}

export const Login = (props: LoginProps) => {
  const tab = props.tab && props.tab === 'signup' ? 'signup' : 'signin';
  const [tabIndex, setTabIndex] = useState<string>(tab);
  const handleChange = (event: React.SyntheticEvent, value: string) => {
    setTabIndex(value);
  };

  return (
    <main className="main">
      <Container>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={handleChange}>
            <Tab value="signin" label="Sign in" />
            <Tab value="signup" label="Sign up" />
          </Tabs>
        </Box>
        {tabIndex === 'signin' && <SignIn />}
        {tabIndex === 'signup' && <SignUp />}
      </Container>
    </main>
  );
};
