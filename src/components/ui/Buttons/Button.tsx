import React from 'react';
import { Button as MuiButton, useTheme } from '@mui/material';

interface CustomButtonProps {
  onClick: () => void;
  label: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<CustomButtonProps> = ({ onClick, label, type = 'button' }) => {
  const theme = useTheme();
  return (
    <MuiButton
      onClick={onClick}
      variant="outlined"
      type={type}
      sx={{
        ...theme.typography.button,
        width: { xs: 116, sm: 138, md: 138 },
        height: { xs: 34, sm: 40, md: 40 },
        minWidth: 50,
        minHeight: 28,
        px: 3,
        py: 1,
        borderRadius: '100px',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        color: '#FFFFFFE6',
        backgroundColor: 'transparent',
        textTransform: 'none',
        fontFamily: "sans-serif",
        whiteSpace: 'nowrap',   // <- no wrapping
        lineHeight: 1.2,        // <- keep text on one line nicely
        display: 'inline-flex', // <- consistent layout
        fontWeight: 400,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'rgba(255, 255, 255, 0.6)',
        },
      }}
    >
      {label}
    </MuiButton>
  );
};

export default Button;