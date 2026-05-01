import { Box, Typography, useTheme } from "@mui/material";

interface StepItemCardProps {
  leftImg?: string;
  rightImg?: string;
  text?: string;
  alt?: string;
}

const StepItem: React.FC<StepItemCardProps> = ({
  text, leftImg, rightImg, alt
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        placeItems: "center",
        mt: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Numbers */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: {xs: "translate(-50%, -53%)", sm: "translate(-50%, -59%)", md: "translate(-50%, -66%)", lg: "translate(-50%, -72%)" },
            zIndex: 1,
            display: "flex",
            gap: "16px",
            pointerEvents: "none",
          }}
        >
          <Box component="img" src={leftImg} alt={alt} />
          <Box component="img" src={rightImg} alt={alt} />
        </Box>

        {/* Glass Card */}
        <Box
          sx={{
            position: "relative",
            width: {xs: '248px', sm: '270px', md: '256px', lg: '255px', xl: '300px' },
            height: {xs: 66, sm: 66, md: 80 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
            lineHeight: 1.5,
            borderRadius: "20px",
            px: { xs: 2.5, sm: 3 },
            py: { xs: 1, sm: 2, md: 3 },
            zIndex: 2,
            background: "rgb(10 15 28 / 80%)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            sx={{
              ...theme.typography.custom,
              fontWeight: 400,
              fontFamily: `"Poppins", sans-serif`,
              color: "#FFFFFFE6",
            }}
          >
            {text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default StepItem;