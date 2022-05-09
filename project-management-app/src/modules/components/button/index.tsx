import { Button } from '@mui/material';
import { PRIMARY_COLOR } from '../../constants/constGlobal';

export const PrimaryBtn = ({ text }: { text: string }) => (
  <Button variant="contained" sx={{ backgroundColor: PRIMARY_COLOR }}>
    {text}
  </Button>
);
