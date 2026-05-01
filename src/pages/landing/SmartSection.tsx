import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import smartSectionData from '../../data/smartFeaturesData.json'; // <-- your JSON file
import SmartCard from '../../components/ui/Cards/SmartCard';

const SmartSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      id='smart'
      component="section"
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        py: { xs: 5, md: 20 },
        m: 0
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: 1330, px: { xs: 2, sm: 3 }, m: 0 }}>

        <Typography
          sx={{
            ...theme.typography.h3,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            color: "#FFFFFFE6",
            textAlign: "center",
            mb: { xs: 2.5, sm: 2.5, md: 6 },
            lineHeight: "40px"
          }}
        >
          {smartSectionData.sectionTitle}
        </Typography>

        <SmartCard
          title={smartSectionData.item1.title}
          description={smartSectionData.item1.description}
          image={smartSectionData.item1.image}
        />
      </Container>
    </Box>
  );
};

export default SmartSection;