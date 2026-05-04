import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '260px', md: '280px', lg: '280px', xl: '280px', xxl: '300px' },
          height: { xs: '210px', sm: '225px', md: '225px', lg: '225px', xl: '230px', xxl: '240px' },
          px: {xs: 3, sm: 0, xl: 3},
          fontWeight: 600,
          backdropFilter: 'blur(30px)',
          backgroundColor: '#0A0F1C',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          position: 'relative',
          transition: '400ms',
          textAlign: 'center',
          '&:hover': {
            transform: 'scale(1.02)', // Add hover effect
          },
        }}
      >
        <Box
          component="img"
          src={icon}
          alt={title}
          sx={{ my: 4, mx: "auto", width: 40, height: 40 }}
        />
        <Typography
          sx={{
            ...theme.typography.body1,
            lineHeight: 1.5,
            fontWeight: 500,
            fontFamily: "Poppins, sans-serif",
            color: "#FFFFFFE6",
            pb: "10px",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            ...theme.typography.body1,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            color: '#FFFFFFB3',
            lineHeight: 1.5,
            whiteSpace: {xs: 'normal', sm: 'pre-line' },
          }}
        >
          {description}
        </Typography>
      <Box
          sx={{
            content: '""',
            backgroundColor: '#ffffff13',
            position: 'absolute',
            bottom: '0',
            left: {xs: '35%', sm: '30%', md: '35%', lg: '35%'},
            transform: {xs: 'translateY(-70%)', sm: 'translateY(-130%)', md: 'translateY(-125%)'},
            filter: {xs: 'blur(28px)', sm: 'blur(18px)', md: 'blur(18px)' },
            borderRadius: '50%',
            width: '7rem',
            height: {xs: '2em', sm: '1em', md: '1em'},
          }}
        />
      </Box>
    </Box>
  );
};

export default FeatureCard;