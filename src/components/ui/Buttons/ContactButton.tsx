import React from 'react';
import { Button, CircularProgress, useTheme } from '@mui/material';

interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}

const ContactButton: React.FC<CustomButtonProps> = ({ 
    onClick,
  label,
  type = "button",
  loading = false,
 }) => {
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      fullWidth
      variant="outlined"
      type={type}
      sx={{
        ...theme.typography.body2,
        height: {xs: 48, sm: 48, md: 54},
        minWidth: 50,
        minHeight: 28,
        px: 3,
        py: 1,
        borderRadius: '20px',
        borderWidth: 1,
        borderColor: '#242A3D',
        color: '#FFFFFFE6',
        backgroundColor: 'transparent',
        fontFamily: "Poppins, sans-serif",
        textTransform: 'none',
        fontWeight: 400,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'rgba(255, 255, 255, 0.6)',
        },
      }}
    >
      {loading ? (
        <>
          <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
          {label}
        </>
      ) : (
        label
      )}
    </Button>
  );
};

export default ContactButton;