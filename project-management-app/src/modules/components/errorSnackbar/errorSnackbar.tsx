import * as React from 'react';
import { Box, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ErrorSnackbarProps {
  messages: string[];
}

export default function ErrorSnackbar({ messages }: ErrorSnackbarProps) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(!!messages.length);
  }, [messages]);

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Box>
        {messages.map((message) => (
          <Alert key={message} severity="error" sx={{ width: '100%', marginBottom: '1em' }}>
            {message}
          </Alert>
        ))}
      </Box>
    </Snackbar>
  );
}
