import React from 'react';
import { Box, GridLegacy as Grid } from '@mui/material';
import industryData from '../../data/industryData.json';
import IndustryCard from '../../components/ui/Cards/IndustryCard';

const Industry: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        mt: { xs: '130px', sm: '140px', md: '120px', lg: '130px', xl: '150px', xxl: '220px' },
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Grid
          container
          spacing={{ xs: 3, md: 3, lg: 3, xl: 3, xxl: 5 }}
          justifyContent="center"
          alignItems="center"
          columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 3 }} // 1 on xs/sm, 2 on md, 3 on lg+/xxl
          px={2}
          maxWidth={{md: 900, lg: 1300, xl: 1410, xxl: 1500}}
        >
          {industryData.map((item, idx) => (
            <Grid
              key={idx}
              item
              xs={1}
              sm={1}
              md={1}
              lg={1}
              xl={1}
              xxl={1}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                 alignSelf: { md: idx === 1 ? 'flex-start' : 'center' },
              }}
            >
              <IndustryCard
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Industry;