import './index.scss';
import { SignIn } from './signin';
import { SignUp } from './signup';
import { Container, Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LoginProps {
  tab?: string;
}

export const Login = (props: LoginProps) => {
  const { t } = useTranslation();
  const tab = props.tab && props.tab === 'signup' ? 'signup' : 'signin';
  const [tabIndex, setTabIndex] = useState<string>(tab);
  const handleChange = (event: React.SyntheticEvent, value: string) => {
    setTabIndex(value);
  };

  return (
    <main className="main">
      <Container>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={handleChange} variant="fullWidth">
            <Tab value="signin" label={t('logIn')} />
            <Tab value="signup" label={t('signUp')} />
          </Tabs>
        </Box>
        {tabIndex === 'signin' && <SignIn />}
        {tabIndex === 'signup' && <SignUp />}
      </Container>
    </main>
  );
};
