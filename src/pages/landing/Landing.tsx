import Industry from './Industry';
import Features from './Features';
import Steps from './Steps';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import ContactUsGradient from '/assets/ContactUsGradient.svg'
import StepGradient from '/assets/StepGradient.svg'
import HeroGradient320 from '/assets/HeroGradient320.svg'
import HeroGradient900 from '/assets/HeroGradient900.svg'
import HeroGradient1920 from '/assets/HeroGradient1920.svg'
import StepGradient320 from '/assets/StepGradient320.svg'
import ContactUsGradient320 from '/assets/ContactUsGradient320.svg'

import Hero from './Hero';
import SmartSection from './SmartSection';
import ContactUs from './ContactUs';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { scrollToId } from '../../components/utils/scrollToId';
import { useDocumentTitle } from '../../hooks';

function ResponsiveImage(props: any) {
  useDocumentTitle("Landing");

  const { src, ...rest } = props;
  const theme = useTheme();

  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const md = useMediaQuery(theme.breakpoints.only("md"));
  const lg = useMediaQuery(theme.breakpoints.only("lg"));
  const xl = useMediaQuery(theme.breakpoints.only("xl"));
  const xxl = useMediaQuery("(min-width:1920px)");

  let selectedSrc = src?.xs;
  if (sm) selectedSrc = src?.sm ?? selectedSrc;
  if (md) selectedSrc = src?.md ?? selectedSrc;
  if (lg) selectedSrc = src?.lg ?? selectedSrc;
  if (xl) selectedSrc = src?.xl ?? selectedSrc;
  if (xxl) selectedSrc = src?.xxl ?? selectedSrc;

  return <Box component="img" src={selectedSrc} {...rest} />;
}
const Landing: React.FC = () => {
   const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => scrollToId(id), 0);
    }
  }, [location.hash]);

  return (
    <>
      <Box sx={{ position: 'relative', mt: 0 }}>
        <ResponsiveImage
          src={{
            xs: HeroGradient320,
            sm: HeroGradient900,
            md: HeroGradient1920,
            lg: HeroGradient1920,
            xl: HeroGradient1920,
            xxl: HeroGradient1920,
          }}
          alt=""
          aria-hidden
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            height: { xs: "190%", sm: "190%", md: "188%", lg: "188%", xl: "185%", xxl: "185%" },
            width: "100%",
            objectFit: "cover",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Hero />
          </Box>
        </Box>
      </Box>
      <Industry />
      <Features />
      <Box sx={{ position: 'relative', mt: 0 }}>
        <ResponsiveImage
          src={{
            xs: StepGradient320,
            sm: StepGradient320,
            md: StepGradient,
            lg: StepGradient,
            xl: StepGradient,
            xxl: StepGradient,
          }}
          alt="Contact section background gradient"
          sx={{
            position: 'absolute',
            top: {xs: '77%', sm: '100%', md: '80%', lg: '91%'},
            left: '50%',
            transform: {xs: 'translate(-50%, -50%)', sm: 'translate(-50%, -50%)', md: 'translate(-50%, -50%)'},
            width: '100%',
            height: 'auto',
            zIndex: 0,
            filter: { xs: 'blur(50px)', sm: 'blur(80px)', md: 'blur(82px)', lg: 'blur(82px)', xl: 'blur(82px)', xxl: 'blur(120px)' },
            pointerEvents: 'none',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Steps />
          </Box>
        </Box>
      </Box>
      <SmartSection />
      <Box sx={{ position: 'relative', mt: 0 }}>
       <ResponsiveImage
          src={{
            xs: ContactUsGradient320,
            sm: ContactUsGradient320,
            md: ContactUsGradient,
            lg: ContactUsGradient,
            xl: ContactUsGradient,
            xxl: ContactUsGradient,
          }}
          alt="Contact section background gradient"
          sx={{
            position: 'absolute',
            top: {xs: '63%', sm: '45%', md: '67%', lg: '67%'},
            left: '50%',
            transform: 'translate(-50%, -50%)',
            objectFit: "cover",
            width: '100%',
            height: {xs: '135%', sm: '180%', md: 'auto'},
            zIndex: 0,
            filter: { xs: 'blur(70px)', sm: 'blur(110px)', md: 'blur(82px)', lg: 'blur(82px)', xl: 'blur(82px)', xxl: 'blur(130px)' },
            pointerEvents: 'none',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box id='contact' sx={{ position: 'relative', mb: { xs: 2, sm: 2, md: 7, lg: 17 }, zIndex: 1 }}>
            <ContactUs />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Landing;