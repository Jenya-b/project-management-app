import './index.scss';
import { SignIn } from './signin';
import { SignUp } from './signup';
import { Container, Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';

export const Login = () => {
  const [tabIndex, setTabIndex] = useState<string>('signin');
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
