import React from 'react';
import './index.scss';
import { Container, Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loading } from '../../components/loading';

const SignIn = React.lazy(() => import('./signin'));
const SignUp = React.lazy(() => import('./signup'));

export interface LoginProps {
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
        {tabIndex === 'signin' && (
          <React.Suspense fallback={<Loading isLoading={true} />}>
            <SignIn />
          </React.Suspense>
        )}
        {tabIndex === 'signup' && <SignUp />}
      </Container>
    </main>
  );
};
