import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ListItemProject } from '../../components/listItemProject';
import { useTranslation } from 'react-i18next';

export const Main = () => {
  const { t } = useTranslation();

  const openBoard = () => {};

  const deleteBoard = () => {};

  return (
    <div className="main">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2, fontSize: '1.8rem' }} variant="h6">
              {t('ListOfProjects')}
            </Typography>
            <Box>
              <List>
                {Array.from(Array(6)).map((item, index) => (
                  <ListItemProject
                    key={index}
                    title="text"
                    openBoard={openBoard}
                    deleteBoard={deleteBoard}
                  />
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
