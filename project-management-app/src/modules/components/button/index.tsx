import { Button } from '@mui/material';

type BtnType = {
  text: string;
  color: string;
  variant: 'contained' | 'text' | 'outlined';
};

export const Btn = ({ text, color, variant }: BtnType) => (
  <Button variant={variant} sx={{ backgroundColor: color }}>
    {text}
  </Button>
);
