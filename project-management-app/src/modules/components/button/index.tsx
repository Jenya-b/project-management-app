import { Button } from '@mui/material';

export const Btn = ({ text }: { text: string }) => (
  <Button variant="contained" sx={{ backgroundColor: '#3026b9' }}>
    {text}
  </Button>
);
