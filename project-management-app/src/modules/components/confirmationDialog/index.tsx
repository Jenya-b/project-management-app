import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { ConfirmationDialogType } from '../../types';
import './index.scss';

export const ConfirmationDialog = ({
  isActive,
  title,
  desc,
  closeWindow,
  confirmAction,
}: ConfirmationDialogType) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isActive} onClose={closeWindow}>
      <DialogTitle>{t(title)}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t(desc)}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={confirmAction}>{t('btnDialogOk')}</Button>
        <Button onClick={closeWindow}>{t('btnDialogCancel')}</Button>
      </DialogActions>
    </Dialog>
  );
};
