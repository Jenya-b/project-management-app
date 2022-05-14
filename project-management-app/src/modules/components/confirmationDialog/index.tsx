import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { ConfirmationDialogType } from '../../types';
import './index.scss';

export const ConfirmationDialog = ({ title, desc }: ConfirmationDialogType) => {
  const { t } = useTranslation();

  return (
    <>
      <DialogTitle>{t(title)}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t(desc)}</DialogContentText>
      </DialogContent>
    </>
  );
};
