import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import heroData from '../../data/heroData.json';
import Button from "../../components/ui/Buttons/Button";
import { scrollToId } from "../../components/utils/scrollToId";

const Hero: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", alignItems: "center", height: '100%', flexDirection: "column", textAlign: "center", px: 2 }}>
      <Typography sx={{ ...theme.typography.h3, fontFamily: "Poppins, sans-serif", color: "#FFFFFFE6", fontWeight: 600, mb: 2, pt: {xs: "70px", sm: "60px", md: "60px", lg: "100px", xl: "135px"} }}>
        {heroData.heading}
      </Typography>
      <Typography sx={{ ...theme.typography.h3, fontFamily: "Poppins, sans-serif", color: "#FFFFFFE6", fontWeight: 400, mb: 2 }}>
        {heroData.subheading}
      </Typography>

      <Typography sx={{ ...theme.typography.body1, fontFamily: "Poppins, sans-serif", color: "#FFFFFFE6", letterSpacing: 0.8, mb: 2, px: 0, fontWeight: 400, whiteSpace: {xs: 'none', sm: 'pre-line', md: "pre-line", lg: "pre-line", xl: "pre-line"} }}>
        {heroData.description}
      </Typography>

      <Box sx={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center" }}>
        <Button onClick={() => scrollToId("contact")} label={heroData.buttonLabel} />
      </Box>
    </Box>
  );
};

export default Hero;