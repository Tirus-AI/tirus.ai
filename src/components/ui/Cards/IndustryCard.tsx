import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

interface IndustryCardProps {
  title: string;
  description: string;
  icon?: string;
  onWatchDemo?: () => void;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ title, description, icon, onWatchDemo }) => {
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
            width: '100%',
            height: 5,
            backgroundImage: 'linear-gradient(270deg, transparent 0%, #5c33bc 50%, transparent 100%)',
            backgroundSize: '50% 100%',
            backgroundPosition: 'center top',
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
          {onWatchDemo && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                onClick={(e) => { e.stopPropagation(); onWatchDemo(); }}
                size="small"
                startIcon={<PlayCircleOutlineIcon sx={{ fontSize: '15px !important' }} />}
                sx={{
                  color: 'rgba(255,255,255,0.55)',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  textTransform: 'none',
                  lineHeight: 1.5,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  minWidth: 0,
                  '&:hover': {
                    color: '#fff',
                    backgroundColor: 'rgba(92,51,188,0.15)',
                    borderColor: 'rgba(92,51,188,0.5)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                Watch Demo
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default IndustryCard;