import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import membersData from "../../data/membersData.json";
import Grid from '@mui/material/GridLegacy';

type Member = {
    name: string;
    role: string;
    image: string;
};

const Members: React.FC = () => {
    const theme = useTheme();

    return (
       <Box
      component="section"
      sx={{
        width: "100%",
        mt: { xs: "110px", sm: "100px", md: "100px", lg: "150px", xl: "130px", xxl: "220px" },
        backgroundColor: "transparent",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          ...theme.typography.h3,
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          color: "#FFFFFFE6",
          textAlign: "center",
          mb: { xs: 2.5, sm: 2.5, md: 6 },
          lineHeight: "40px",
        }}
      >
        {membersData.sectionTitle}
      </Typography>

      {/* Wrapper controls width & centers the grid */}
      <Box
        sx={{
          maxWidth: { sm: 595, md: 895, lg: 1210, xl: 1220, xxl: 1215 },
          mx: "auto",
          px: { xs: 2, sm: 0, md: 0, lg: 0, xl: 1.5 },
        }}
      >
        <Grid
          container
          columnSpacing={3}  // 24px columns
          rowSpacing={4}     // 24px rows (tune if you want different)
          justifyContent="center"
          alignItems="center"
          wrap="wrap"
        >
          {(membersData.items as Member[]).map((m) => (
            <Grid
              item
              key={`${m.name}-${m.role}`}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={3}
            >
                             <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 282,   // cap to your design width
                  mx: "auto",      // center inside the cell
                  borderRadius: "20px",
                  overflow: "hidden",
                  backgroundColor: "transparent",
                }}
              >
                                <Box
                                    component="img"
                                    src={m.image}
                                    alt={`${m.name} — ${m.role}`}
                                    sx={{
                                        width: "100%",
                                        height: 240,
                                        objectFit: "cover",
                                        objectPosition: "top",
                                        display: "block",
                                    }}
                                />
                                <Box
                                    sx={{
                                        width: "100%",
                                        backgroundColor: "#181D3A",
                                        py: 1,
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 0.5,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            ...theme.typography.body2,
                                            color: "#FFFFFFE6",
                                            fontWeight: 500,
                                            fontFamily: "Poppins, sans-serif",
                                            textAlign: "center",
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {m.name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            ...theme.typography.body2,
                                            color: "#FFFFFFB3",
                                            fontWeight: 400,
                                            fontFamily: "Poppins, sans-serif",
                                            textAlign: "center",
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {m.role}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
        </Box>
        </Box>
    );
};

export default Members;