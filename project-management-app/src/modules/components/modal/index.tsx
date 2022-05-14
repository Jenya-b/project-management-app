import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { BasicModalType } from '../../types';
import { PrimaryBtn } from '../button';
import './index.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const BasicModal = ({ isActive, closeWindow, confirmAction, children }: BasicModalType) => (
  <Modal open={isActive} onClose={closeWindow}>
    <Box sx={style}>
      {children}
      <div className="modal-btn-wrapp">
        <PrimaryBtn variant="contained" text="btnDialogOk" onClick={confirmAction} />
        <PrimaryBtn variant="contained" text="btnDialogCancel" onClick={closeWindow} />
      </div>
    </Box>
  </Modal>
);
