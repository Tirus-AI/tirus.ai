import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

interface ContactCardProps {
  icon: string;
  title: string;
  description: string;
  link?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, description, link }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative", 
        width: {
          xs: "100%",
          sm: "100%",
          md: "381px"
        },
        height: "198px",
        maxHeight: 196,
        border: "2px solid transparent",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        gap: 1,
      backgroundColor: "transparent",
    "& > .content": { position: "relative", zIndex: 1 },
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      padding: "2px",
      background: "linear-gradient(to right, #6785e866 10%, #ffffff1a 90%)",
      pointerEvents: "none",
      WebkitMask:
        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
    },
      }}
    >
      <Box
        component="img"
        src={icon}
        alt={title}
        sx={{
          width: 40,
          height: 40,
        }}
        pb={4}
      />
      <Typography
        sx={{
          ...theme.typography.body1,
          fontFamily: "Poppins, sans-serif",
          fontWeight: 500,
          color: "#FFFFFFE6",
        }}
      >
        {title}
      </Typography>
      {link ? (
        <Typography
          component="a"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            ...theme.typography.body1,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            color: "#FFFFFFB3",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {description}
        </Typography>
      ) : (
        <Typography
          sx={{
            ...theme.typography.body1,
            fontWeight: 400,
            fontFamily: "Poppins, sans-serif",
            color: "#FFFFFFB3",
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default ContactCard;