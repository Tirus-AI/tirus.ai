import React from "react";
import { Snackbar, Alert, type AlertColor } from "@mui/material";

export type AppSnackbarProps = {
  open: boolean;
  message: string;
  severity?: AlertColor;
  onClose?: () => void;
  autoHideDuration?: number;
};

const AppSnackbar: React.FC<AppSnackbarProps> = ({
  open,
  message,
  severity = "info",
  onClose,
  autoHideDuration = 3000,
}) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ mt: 10 }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;