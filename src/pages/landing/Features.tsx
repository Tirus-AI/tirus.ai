import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import featureData from '../../data/featuresData.json';
import FeatureCard from '../../components/ui/Cards/FeatureCard';

const Features: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      id='feature'
      component="section"
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        py: { xs: 5, md: 20 },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: {xs: 600, sm: 600, md: 650, lg: 1200, xl: 1450},
          px: { xs: 2, sm: 3, lg: 0 },
        }}
      >
        <Typography
          sx={{
            ...theme.typography.h3,
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            color: '#FFFFFFE6',
            textAlign: 'center',
            mb: {xs: 2.5, sm: 2.5, md: 6},
            lineHeight: "40px"
          }}
        >
          {featureData.sectionTitle}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: {xs: 2, sm: 3, md: 3},
            justifyItems: 'center',
          }}
        >
          {featureData.items.map((item, i) => (
            <FeatureCard
              key={i}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Features;