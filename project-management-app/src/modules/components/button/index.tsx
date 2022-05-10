import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PRIMARY_COLOR } from '../../constants/constGlobal';
import { ButtonType } from '../../types';

export const PrimaryBtn = ({ variant, text }: ButtonType) => {
  const { t } = useTranslation();

  return (
    <Button variant={variant} sx={{ backgroundColor: PRIMARY_COLOR }}>
      {t(text)}
    </Button>
  );
};
