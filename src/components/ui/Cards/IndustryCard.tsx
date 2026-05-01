import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

interface IndustryCardProps {
  title: string;
  description: string;
  icon?: string;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ title, description, icon }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '100%',
      }}
    >
      <Box
        sx={{
          width: { sm: 380, md: 384, lg: 392, xl: 430, },
          borderRadius: '10px',
          backgroundColor: '#ffffff14',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: '2px',
          py: '2px',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 5,
            backgroundImage: 'linear-gradient(90deg, transparent 0%, #5c33bc 50%, transparent 100%)',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            width: 'calc(100% - 6px)',
            minHeight: {xs: 90, sm: 130, md: 130, lg: 126, xl: 150},
            maxHeight: '100%',
            borderRadius: '10px',
            backgroundColor: '#0a0f1c',
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            px: '32px',
            py: '24px',
            boxShadow: 'inset 0 0 15px rgba(255, 255, 255, 0.06)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="img"
              src={icon}
              alt={title}
              sx={{ width: 24, height: 24 }}
            />
            <Typography
              sx={{
                ...theme.typography.subtitle1,
                fontWeight: 500,
                color: '#FFFFFFE6',
                fontFamily: 'Poppins, sans-serif',
                lineHeight: 1.5,
              }}
            >
              {title}
            </Typography>
          </Box>
          <Typography
            sx={{
              mt: 3,
              ...theme.typography.body2,
              fontWeight: 400,
              color: '#EAECF0',
              fontFamily: 'Poppins, sans-serif',
              lineHeight: 1.5,
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default IndustryCard;