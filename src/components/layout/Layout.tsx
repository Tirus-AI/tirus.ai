import React from 'react';
import { Box } from '@mui/material';
import Header from '../ui/Header';
import Footer from '../ui/Footer/Footer';
import { Outlet } from 'react-router-dom';


const Layout: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#0A0F1C',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          marginTop: '80px',
          flexGrow: 1,
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;